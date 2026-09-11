-- The Spring Edit — initial schema
-- Registrations model: anonymous checkout (no registrant accounts), per-attendee
-- workshop choice, price snapshotted at purchase time. Admin auth (profiles) is
-- schema'd now so later phases don't need another migration to add it.

create extension if not exists "pgcrypto";

-- ── Admins ──────────────────────────────────────────────────────────────
-- One row per admin, keyed to a Supabase Auth user. Registrants never get a
-- row here — checkout is anonymous.
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  is_admin boolean not null default false,
  is_super_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table pending_admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  invited_by uuid references profiles(id),
  is_super_admin boolean not null default false,
  created_at timestamptz not null default now(),
  accepted_at timestamptz
);

-- is_admin()/is_super_admin() are SECURITY DEFINER so RLS policies can call
-- them without each policy re-querying profiles under the caller's own
-- (possibly restricted) permissions.
create function is_admin() returns boolean
  language sql security definer stable
  set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and is_admin = true
  );
$$;

create function is_super_admin() returns boolean
  language sql security definer stable
  set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and is_super_admin = true
  );
$$;

-- ── Workshops ───────────────────────────────────────────────────────────
create table workshops (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image text,
  capacity int,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

-- ── Registrations (one row per checkout/order) ─────────────────────────
create table registrations (
  id uuid primary key default gen_random_uuid(),
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text not null,
  pass_type text not null check (pass_type in ('regular', 'premium')),
  quantity int not null check (quantity in (1, 3, 5, 7, 9)),
  per_person_price numeric not null,
  discount_pct numeric not null default 0,
  total_amount numeric not null,
  payment_status text not null default 'created'
    check (payment_status in ('created', 'paid', 'failed')),
  razorpay_order_id text unique,
  razorpay_payment_id text,
  created_at timestamptz not null default now()
);

create index idx_registrations_payment_status on registrations(payment_status);
create index idx_registrations_buyer_email on registrations(buyer_email);

-- ── Attendees (one row per person in a registration) ───────────────────
create table attendees (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references registrations(id) on delete cascade,
  name text not null,
  phone text not null,
  is_buyer boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_attendees_registration on attendees(registration_id);

-- ── Attendee <-> Workshop choices ───────────────────────────────────────
create table attendee_workshops (
  id uuid primary key default gen_random_uuid(),
  attendee_id uuid not null references attendees(id) on delete cascade,
  workshop_id uuid not null references workshops(id),
  unique (attendee_id, workshop_id)
);

create index idx_attendee_workshops_workshop on attendee_workshops(workshop_id);

-- ── Email audit / dedup log ─────────────────────────────────────────────
create table email_logs (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid references registrations(id) on delete set null,
  recipient_email text not null,
  email_type text not null,
  status text not null check (status in ('sent', 'failed')),
  provider_message_id text,
  metadata jsonb not null default '{}'::jsonb,
  sent_at timestamptz not null default now()
);

create index idx_email_logs_dedup on email_logs(registration_id, email_type, status, sent_at);

-- ── Admin request audit log ──────────────────────────────────────────────
create table request_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references profiles(id),
  admin_email text,
  action text not null check (action in ('CREATE', 'READ', 'UPDATE', 'DELETE')),
  path text not null,
  method text not null,
  ip text,
  created_at timestamptz not null default now()
);

create index idx_request_logs_created on request_logs(created_at desc);

-- ── Row Level Security ───────────────────────────────────────────────────
-- Registrations/attendees/attendee_workshops/email_logs/request_logs are
-- written exclusively by server-side API routes using the service role key
-- (which bypasses RLS entirely), never directly from the browser. RLS below
-- only needs to grant read access to logged-in admins, plus public read on
-- workshops for the registration picker.

alter table profiles enable row level security;
alter table pending_admins enable row level security;
alter table workshops enable row level security;
alter table registrations enable row level security;
alter table attendees enable row level security;
alter table attendee_workshops enable row level security;
alter table email_logs enable row level security;
alter table request_logs enable row level security;

create policy "admins can read all profiles" on profiles
  for select using (is_admin());
create policy "users can read their own profile" on profiles
  for select using (id = auth.uid());

create policy "super admins manage pending admins" on pending_admins
  for all using (is_super_admin()) with check (is_super_admin());

create policy "anyone can read workshops" on workshops
  for select using (true);
create policy "admins manage workshops" on workshops
  for insert with check (is_admin());
create policy "admins update workshops" on workshops
  for update using (is_admin());
create policy "admins delete workshops" on workshops
  for delete using (is_admin());

create policy "admins can read registrations" on registrations
  for select using (is_admin());
create policy "admins can update registrations" on registrations
  for update using (is_admin());

create policy "admins can read attendees" on attendees
  for select using (is_admin());

create policy "admins can read attendee workshops" on attendee_workshops
  for select using (is_admin());

create policy "admins can read email logs" on email_logs
  for select using (is_admin());

create policy "super admins can read request logs" on request_logs
  for select using (is_super_admin());

export type PassType = "regular" | "premium";

export const PASSES = {
  regular: {
    id: "regular",
    label: "Regular Pass",
    perPerson: 599,
    workshops: 1,
    includes: "Access to 1 workshop & GFF",
  },
  premium: {
    id: "premium",
    label: "Premium Pass",
    perPerson: 1599,
    workshops: 3,
    includes: "Access to 3 workshops & GFF",
  },
} as const satisfies Record<PassType, { id: PassType; label: string; perPerson: number; workshops: number; includes: string }>;

export const QUANTITIES = [1, 3, 5, 7, 9] as const;
export type Quantity = (typeof QUANTITIES)[number];

export const DISCOUNT_PCT: Record<Quantity, number> = { 1: 0, 3: 10, 5: 15, 7: 18, 9: 20 };

// Published totals are stored rather than computed: the advertised figures differ from
// perPerson * qty * (1 - discount) by ₹1-2 at the 7- and 9-person tiers, and the charge
// must match the price on the page.
const TOTALS: Record<PassType, Record<Quantity, number>> = {
  regular: { 1: 599, 3: 1617, 5: 2545, 7: 3437, 9: 4312 },
  premium: { 1: 1599, 3: 4317, 5: 6795, 7: 9178, 9: 11513 },
};

export function isValidQuantity(qty: number): qty is Quantity {
  return (QUANTITIES as readonly number[]).includes(qty);
}

export function getWorkshopAllowance(pass: PassType): number {
  return PASSES[pass].workshops;
}

export function calculateTotal(pass: PassType, qty: Quantity): number {
  return TOTALS[pass][qty];
}

export function getPriceBreakdown(pass: PassType, qty: Quantity) {
  const { label, perPerson } = PASSES[pass];
  const subtotal = perPerson * qty;
  const total = TOTALS[pass][qty];
  const discountPct = DISCOUNT_PCT[qty];

  const items: { label: string; amount: number }[] = [
    { label: `${label} — ₹${perPerson} × ${qty}`, amount: subtotal },
  ];
  if (discountPct > 0) {
    items.push({ label: `Group discount (${discountPct}% off)`, amount: total - subtotal });
  }

  return { items, subtotal, discountPct, savings: subtotal - total, total };
}

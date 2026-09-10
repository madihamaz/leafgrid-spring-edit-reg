# The Spring Edit by LeafGrid

Registration site for LeafGrid's nature-inspired creative workshops, built with Vite, React, TypeScript, shadcn/ui, and Tailwind CSS.

## Development

```sh
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `VITE_APPSCRIPT_URL` — Google Apps Script Web App URL that logs registrations to a Google Sheet.
- `VITE_RAZORPAY_KEY_ID` — Razorpay publishable Key ID used for client-side checkout.

Both are optional for local dev (registration logging and payment will be skipped/fail gracefully without them), but required in production.

## Deploying to Vercel

This is a static single-page app (Vite build output in `dist/`) with client-side routing via `react-router-dom`.

1. Import the repo into Vercel (Framework Preset: **Vite** is auto-detected).
2. Set the environment variables above in the Vercel project settings (Production, and Preview if needed).
3. Deploy — `vercel.json` in the repo handles the SPA rewrite so routes like `/register` and `/confirmation` work on direct load/refresh.

## Testing

```sh
npm run test        # unit tests (Vitest)
npx playwright test # e2e tests
```

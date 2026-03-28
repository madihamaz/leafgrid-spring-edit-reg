export const REGISTRATION_FEE = 99;
export const WORKSHOP_PRICE = 300;
export const WORKSHOP_PRICE_EXTRA = 350;

export function calculateTotal(workshopCount: number): number {
  if (workshopCount <= 0) return REGISTRATION_FEE;
  if (workshopCount <= 2) return REGISTRATION_FEE + workshopCount * WORKSHOP_PRICE;
  return REGISTRATION_FEE + 2 * WORKSHOP_PRICE + (workshopCount - 2) * WORKSHOP_PRICE_EXTRA;
}

export function getPriceBreakdown(workshopCount: number) {
  const items: { label: string; amount: number }[] = [
    { label: "Registration Fee", amount: REGISTRATION_FEE },
  ];

  if (workshopCount <= 2) {
    if (workshopCount > 0) {
      items.push({ label: `${workshopCount} Workshop${workshopCount > 1 ? "s" : ""} × ₹${WORKSHOP_PRICE}`, amount: workshopCount * WORKSHOP_PRICE });
    }
  } else {
    items.push({ label: `2 Workshops × ₹${WORKSHOP_PRICE}`, amount: 2 * WORKSHOP_PRICE });
    items.push({ label: `${workshopCount - 2} Extra Workshop${workshopCount - 2 > 1 ? "s" : ""} × ₹${WORKSHOP_PRICE_EXTRA}`, amount: (workshopCount - 2) * WORKSHOP_PRICE_EXTRA });
  }

  return { items, total: calculateTotal(workshopCount) };
}

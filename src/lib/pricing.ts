export const WORKSHOP_PRICE = 399;

export function calculateTotal(workshopCount: number): number {
  if (workshopCount <= 0) return 0;
  return workshopCount * WORKSHOP_PRICE;
}

export function getPriceBreakdown(workshopCount: number) {
  const items: { label: string; amount: number }[] = [];

  if (workshopCount > 0) {
    items.push({
      label: `${workshopCount} Workshop${workshopCount > 1 ? "s" : ""} × ₹${WORKSHOP_PRICE}`,
      amount: workshopCount * WORKSHOP_PRICE,
    });
  }

  return { items, total: calculateTotal(workshopCount) };
}

export const TICKET_PRICE = 1200;
export const MIN_WORKSHOPS = 3;

export function calculateTotal(_workshopCount: number): number {
  return TICKET_PRICE;
}

export function getPriceBreakdown(workshopCount: number) {
  const items: { label: string; amount: number }[] = [];

  if (workshopCount > 0) {
    items.push({
      label: `Entry ticket (includes ${workshopCount} workshop${workshopCount > 1 ? "s" : ""})`,
      amount: TICKET_PRICE,
    });
  }

  return { items, total: TICKET_PRICE };
}

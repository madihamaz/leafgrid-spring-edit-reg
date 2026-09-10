import { describe, expect, it } from "vitest";
import {
  calculateTotal,
  getPriceBreakdown,
  getWorkshopAllowance,
  isValidQuantity,
  type Quantity,
} from "./pricing";

// The advertised price table. The site must charge exactly these amounts.
const ADVERTISED: Array<[("regular" | "premium"), Quantity, number]> = [
  ["regular", 1, 599],
  ["regular", 3, 1617],
  ["regular", 5, 2545],
  ["regular", 7, 3437],
  ["regular", 9, 4312],
  ["premium", 1, 1599],
  ["premium", 3, 4317],
  ["premium", 5, 6795],
  ["premium", 7, 9178],
  ["premium", 9, 11513],
];

describe("calculateTotal", () => {
  it.each(ADVERTISED)("%s pass for %i people costs ₹%i", (pass, qty, expected) => {
    expect(calculateTotal(pass, qty)).toBe(expected);
  });
});

describe("isValidQuantity", () => {
  it("accepts only the bookable group sizes", () => {
    expect([1, 3, 5, 7, 9].every(isValidQuantity)).toBe(true);
  });

  it("rejects sizes that are not offered", () => {
    expect([0, 2, 4, 6, 8, 10, 11, -1, 1.5].some(isValidQuantity)).toBe(false);
  });
});

describe("getWorkshopAllowance", () => {
  it("gives Regular one workshop and Premium three", () => {
    expect(getWorkshopAllowance("regular")).toBe(1);
    expect(getWorkshopAllowance("premium")).toBe(3);
  });
});

describe("getPriceBreakdown", () => {
  it("shows no discount line for a single person", () => {
    const { items, savings, total } = getPriceBreakdown("premium", 1);
    expect(items).toHaveLength(1);
    expect(savings).toBe(0);
    expect(total).toBe(1599);
  });

  it("reports the advertised saving for a group", () => {
    const { subtotal, savings, total, discountPct } = getPriceBreakdown("premium", 5);
    expect(subtotal).toBe(7995);
    expect(discountPct).toBe(15);
    expect(savings).toBe(1200);
    expect(total).toBe(6795);
  });

  it("keeps subtotal, savings and total consistent across every tier", () => {
    for (const [pass, qty, expected] of ADVERTISED) {
      const { subtotal, savings, total } = getPriceBreakdown(pass, qty);
      expect(total).toBe(expected);
      expect(subtotal - savings).toBe(total);
    }
  });
});

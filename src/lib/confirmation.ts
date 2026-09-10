import type { PassType } from "@/lib/pricing";

export interface ConfirmationDetails {
  name: string;
  email: string;
  passType: PassType;
  quantity: number;
  workshops: string[];
  paymentId: string;
  total: number;
}

const STORAGE_KEY = "spring-edit:confirmation";

export function storeConfirmation(details: ConfirmationDetails) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch {
    // Storage can throw outright in private mode or with site data blocked;
    // the confirmation page renders a generic message when nothing is found.
  }
}

export function readConfirmation(): ConfirmationDetails | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConfirmationDetails) : null;
  } catch {
    return null;
  }
}

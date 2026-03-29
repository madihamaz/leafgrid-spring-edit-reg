const APPSCRIPT_URL = import.meta.env.VITE_APPSCRIPT_URL as string | undefined;

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  workshops: string[];
  total: number;
  paymentId: string;
}

export async function logRegistration(data: RegistrationData): Promise<boolean> {
  if (!APPSCRIPT_URL) {
    console.warn("VITE_APPSCRIPT_URL not set — skipping Google Sheet logging");
    return false;
  }

  try {
    await fetch(APPSCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return true;
  } catch (err) {
    console.error("Failed to log registration:", err);
    return false;
  }
}

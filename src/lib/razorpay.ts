declare global {
  interface Window {
    Razorpay: any;
  }
}

export function loadRazorpay(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
}

interface RazorpayOptions {
  amount: number; // in INR (will be converted to paise)
  name: string;
  email: string;
  phone: string;
  description: string;
  keyId: string;
  onSuccess: (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string }) => void;
  onFailure: (error: any) => void;
}

export async function initiatePayment(options: RazorpayOptions) {
  await loadRazorpay();

  const rzp = new window.Razorpay({
    key: options.keyId,
    amount: options.amount * 100, // paise
    currency: "INR",
    name: "LeafGrid",
    description: options.description,
    prefill: {
      name: options.name,
      email: options.email,
      contact: options.phone,
    },
    theme: {
      color: "#4a7c59",
    },
    handler: options.onSuccess,
    modal: {
      ondismiss: () => options.onFailure({ reason: "Payment cancelled" }),
    },
  });

  rzp.on("payment.failed", options.onFailure);
  rzp.open();
}

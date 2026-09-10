import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, User, Ticket, Palette, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { workshops } from "@/components/WorkshopsSection";
import { useToast } from "@/hooks/use-toast";
import {
  calculateTotal,
  getPriceBreakdown,
  getWorkshopAllowance,
  DISCOUNT_PCT,
  PASSES,
  QUANTITIES,
  type PassType,
  type Quantity,
} from "@/lib/pricing";
import { initiatePayment } from "@/lib/razorpay";
import { logRegistration } from "@/lib/sheets";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;

const steps = [
  { label: "Your Details", icon: User },
  { label: "Pick a Pass", icon: Ticket },
  { label: "Pick Workshops", icon: Palette },
  { label: "Summary", icon: CreditCard },
];

const Register = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState<PassType | null>(null);
  const [quantity, setQuantity] = useState<Quantity>(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [paying, setPaying] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const allowance = pass ? getWorkshopAllowance(pass) : 0;
  const total = pass ? calculateTotal(pass, quantity) : 0;
  const breakdown = pass ? getPriceBreakdown(pass, quantity) : null;

  const choosePass = (next: PassType) => {
    setPass(next);
    setSelected((prev) => prev.slice(0, getWorkshopAllowance(next)));
  };

  const toggleWorkshop = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < allowance
          ? [...prev, id]
          : prev
    );
  };

  const canProceed = () => {
    if (step === 0) return name.trim() && email.trim() && phone.trim();
    if (step === 1) return pass !== null;
    if (step === 2) return selected.length === allowance;
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) {
      const messages = [
        "Please fill all fields",
        "Please choose a pass",
        `Please select ${allowance} workshop${allowance > 1 ? "s" : ""}`,
      ];
      toast({ title: messages[step], variant: "destructive" });
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handlePayment = async () => {
    if (!RAZORPAY_KEY_ID) {
      toast({ title: "Payment gateway not configured", description: "Please set the VITE_RAZORPAY_KEY_ID environment variable.", variant: "destructive" });
      return;
    }
    if (!pass) return;

    setPaying(true);
    try {
      await initiatePayment({
        amount: total,
        name,
        email,
        phone,
        description: `The Spring Edit — ${PASSES[pass].label} × ${quantity}`,
        keyId: RAZORPAY_KEY_ID,
        onSuccess: async (response) => {
          const workshopNames = selected.map((id) => workshops.find((w) => w.id === id)?.name).filter(Boolean) as string[];
          await logRegistration({
            name,
            email,
            phone,
            passType: pass,
            quantity,
            workshops: workshopNames,
            total,
            paymentId: response.razorpay_payment_id,
          });
          setPaying(false);
          navigate("/confirmation", {
            state: {
              name,
              email,
              passType: pass,
              quantity,
              workshops: workshopNames,
              paymentId: response.razorpay_payment_id,
              total,
            },
          });
        },
        onFailure: () => {
          setPaying(false);
          toast({ title: "Payment failed", description: "Please try again.", variant: "destructive" });
        },
      });
    } catch {
      setPaying(false);
      toast({ title: "Could not load payment gateway", variant: "destructive" });
    }
  };

  const selectedWorkshops = selected.map((id) => workshops.find((w) => w.id === id)!);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-2xl">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    i <= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`hidden sm:block text-sm ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`w-6 h-px mx-1 ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h1 className="font-display text-3xl font-bold mb-2">Tell Us About You</h1>
                  <p className="text-muted-foreground">We just need a few details to get you started.</p>
                </div>
                {[
                  { label: "Full Name", value: name, set: setName, type: "text", placeholder: "Your name" },
                  { label: "Email", value: email, set: setEmail, type: "email", placeholder: "you@example.com" },
                  { label: "Phone Number", value: phone, set: setPhone, type: "tel", placeholder: "+91 98765 43210" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm text-foreground mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div className="text-center mb-8">
                  <h1 className="font-display text-3xl font-bold mb-2">Pick Your Pass</h1>
                  <p className="text-muted-foreground">Both passes include entry to the Grand Food Fest.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {(Object.keys(PASSES) as PassType[]).map((key) => {
                    const p = PASSES[key];
                    const isSelected = pass === key;
                    return (
                      <button
                        key={key}
                        onClick={() => choosePass(key)}
                        className={`text-left rounded-2xl border p-5 transition-all duration-300 ${
                          isSelected ? "border-primary glow-leaf bg-card" : "border-border bg-card hover:border-glow"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display font-semibold text-lg">{p.label}</h3>
                          {isSelected && <Check className="w-5 h-5 text-primary-foreground bg-primary rounded-full p-1" />}
                        </div>
                        <p className="font-display text-2xl font-bold text-primary mb-2">
                          ₹{p.perPerson}
                          <span className="text-sm font-body font-normal text-muted-foreground"> / person</span>
                        </p>
                        <p className="text-muted-foreground text-sm">{p.includes}</p>
                      </button>
                    );
                  })}
                </div>

                {pass && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                    <p className="text-sm text-foreground mb-3">How many people?</p>
                    <div className="grid grid-cols-5 gap-2">
                      {QUANTITIES.map((q) => {
                        const isSelected = quantity === q;
                        return (
                          <button
                            key={q}
                            onClick={() => setQuantity(q)}
                            className={`rounded-xl border py-3 transition-all ${
                              isSelected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-glow"
                            }`}
                          >
                            <span className={`block font-display font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                              {q}
                            </span>
                            <span className="block text-[11px] text-muted-foreground mt-0.5">
                              {DISCOUNT_PCT[q] > 0 ? `${DISCOUNT_PCT[q]}% off` : "—"}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {breakdown && (
                      <div className="mt-6 p-4 rounded-xl bg-card border border-border text-center">
                        <span className="text-muted-foreground text-sm">Total: </span>
                        <span className="font-display text-2xl font-bold text-primary">₹{breakdown.total.toLocaleString("en-IN")}</span>
                        {breakdown.savings > 0 && (
                          <span className="block text-xs text-primary mt-1">
                            You save ₹{breakdown.savings.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div className="text-center mb-8">
                  <h1 className="font-display text-3xl font-bold mb-2">Choose Your Workshops</h1>
                  <p className="text-muted-foreground">
                    Pick {allowance} — <span className="text-primary font-medium">{selected.length} of {allowance} selected</span>
                  </p>
                  {quantity > 1 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      We'll collect the other {quantity - 1} attendees' details and workshop choices after payment.
                    </p>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {workshops.map((w) => {
                    const isSelected = selected.includes(w.id);
                    return (
                      <button
                        key={w.id}
                        onClick={() => toggleWorkshop(w.id)}
                        className={`text-left rounded-2xl overflow-hidden border transition-all duration-300 ${
                          isSelected
                            ? "border-primary glow-leaf"
                            : "border-border hover:border-glow"
                        }`}
                      >
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <img src={w.image} alt={w.name} className="w-full h-full object-cover" loading="lazy" width={640} height={640} />
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <Check className="w-8 h-8 text-primary-foreground bg-primary rounded-full p-1.5" />
                            </div>
                          )}
                        </div>
                        <div className="p-4 bg-card">
                          <h3 className="font-display font-semibold">{w.name}</h3>
                          <p className="text-muted-foreground text-xs mt-1">{w.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div className="text-center mb-8">
                  <h1 className="font-display text-3xl font-bold mb-2">Confirm & Pay</h1>
                  <p className="text-muted-foreground">Review your registration details below.</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="text-foreground font-medium">{name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">{email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium">{phone}</p>
                  </div>
                  <hr className="border-border" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pass</p>
                    <p className="text-foreground font-medium">
                      {pass && PASSES[pass].label} — {quantity} {quantity > 1 ? "people" : "person"}
                    </p>
                  </div>
                  <hr className="border-border" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Selected Workshops</p>
                    <div className="space-y-3">
                      {selectedWorkshops.map((w) => (
                        <div key={w.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                          <img src={w.image} alt={w.name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" width={48} height={48} />
                          <span className="font-medium text-foreground">{w.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr className="border-border" />
                  {/* Price breakdown */}
                  {breakdown && (
                    <div className="space-y-2">
                      {breakdown.items.map((item) => (
                        <div key={item.label} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className={item.amount < 0 ? "text-primary" : "text-foreground"}>
                            {item.amount < 0 ? "−" : ""}₹{Math.abs(item.amount).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="font-display text-2xl font-bold text-primary">
                          ₹{breakdown.total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4 italic">
                  Note: Additional workshops can be booked on the spot, subject to availability.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-colors ${
                step > 0
                  ? "text-foreground hover:bg-muted"
                  : "text-muted-foreground/30 cursor-not-allowed"
              }`}
              disabled={step === 0}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePayment}
                disabled={paying}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity animate-pulse-glow disabled:opacity-50"
              >
                {paying ? "Processing…" : `Pay ₹${total.toLocaleString("en-IN")}`} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;

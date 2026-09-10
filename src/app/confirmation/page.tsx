"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, CalendarDays, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PASSES } from "@/lib/pricing";
import { readConfirmation, type ConfirmationDetails } from "@/lib/confirmation";

export default function Confirmation() {
  const [details, setDetails] = useState<ConfirmationDetails | null>(null);

  useEffect(() => {
    setDetails(readConfirmation());
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 flex items-center">
        <div className="container max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>

            <h1 className="font-display text-4xl font-bold mb-3">You&apos;re In! 🌿</h1>
            <p className="text-muted-foreground text-lg mb-8">
              {details?.name ? `Welcome aboard, ${details.name}!` : "Welcome aboard!"} Your spot at The Spring Edit is confirmed.
            </p>

            {details && (
              <div className="rounded-2xl border border-border bg-card p-6 mb-8 text-left space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pass</span>
                  <span className="font-medium text-foreground">
                    {PASSES[details.passType].label} — {details.quantity}{" "}
                    {details.quantity > 1 ? "people" : "person"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount paid</span>
                  <span className="font-medium text-foreground">₹{details.total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">Payment ID</span>
                  <span className="font-mono text-xs text-foreground break-all">{details.paymentId}</span>
                </div>
              </div>
            )}

            {details?.workshops?.length ? (
              <div className="rounded-2xl border border-border bg-card p-6 mb-8 text-left">
                <p className="text-sm text-muted-foreground mb-3">Your Workshops</p>
                <div className="space-y-2">
                  {details.workshops.map((w) => (
                    <div key={w} className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium text-foreground">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-border bg-card p-6 mb-8 text-left space-y-4">
              <p className="font-display font-semibold text-lg">Event Details</p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Grand Food Fest, Gachibowli Stadium, Hyderabad</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CalendarDays className="w-4 h-4 text-primary flex-shrink-0" />
                <span>9–11 October 2026</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Please arrive 15 minutes early</span>
              </div>
            </div>

            <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5 mb-8">
              <p className="text-sm text-muted-foreground">
                📱 Carry this confirmation on your phone. A confirmation email has been sent to{" "}
                <span className="text-foreground">{details?.email || "your email"}</span>.
              </p>
            </div>

            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Send, CheckCircle2, Shield, Loader2 } from "lucide-react";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsLoading(false);
  };

  return (
    <section className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8 border-t border-primary/80 relative overflow-hidden">
      {/* Decorative Corner Lines */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-secondary opacity-60" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-secondary opacity-60" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-secondary opacity-60" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-secondary opacity-60" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="space-y-2 text-center md:text-left max-w-lg">
          <div className="inline-flex items-center gap-1.5 font-mono-spec text-xs tracking-widest text-secondary uppercase font-semibold">
            <Shield className="w-3.5 h-3.5 text-secondary" />
            NEVER MISS A DIRECT LANDLORD LISTING
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Get Fresh Rental Alerts in Your Inbox
          </h2>
          <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed">
            Subscribe for weekly updates on newly verified apartments in
            Gulshan, Banani, Dhanmondi, and Chattogram.
          </p>
        </div>

        <div className="w-full md:w-auto max-w-md">
          {isSubscribed ? (
            <div className="bg-primary/80 border border-secondary/50 rounded-md p-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-secondary font-heading font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscription Confirmed!</span>
              </div>
              <p className="font-mono-spec text-xs text-primary-foreground/80">
                You`re now on the priority list for BDT rent alerts.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email address..."
                  className={`bg-background text-foreground placeholder:text-muted-foreground border border-border rounded-lg h-10 text-xs px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-secondary ${
                    error ? "border-destructive" : "border-border"
                  }`}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto h-10 px-5 bg-secondary hover:bg-secondary/80 disabled:opacity-60 text-white font-mono-spec text-xs font-bold tracking-wider uppercase shrink-0 shadow-sm rounded-lg inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-300 font-mono-spec">{error}</p>
              )}
            </form>
          )}
          <p className="font-mono-spec text-[10px] text-primary-foreground/60 text-center md:text-left mt-2">
            No spam. Unsubscribe anytime with 1-click.
          </p>
        </div>
      </div>
    </section>
  );
}

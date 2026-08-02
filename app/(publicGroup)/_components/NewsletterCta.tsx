"use client";

import { useState } from "react";
import { Send, CheckCircle2, Shield } from "lucide-react";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    setIsSubscribed(true);
  };

  return (
    <section className="bg-[#1F4D3E] text-[#F4F5F1] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#173B2F] relative overflow-hidden">

      {/* Decorative Corner Lines */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C98A2C] opacity-60" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C98A2C] opacity-60" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C98A2C] opacity-60" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C98A2C] opacity-60" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

        <div className="space-y-2 text-center md:text-left max-w-lg">
          <div className="inline-flex items-center gap-1.5 font-mono-spec text-xs tracking-widest text-[#C98A2C] uppercase font-semibold">
            <Shield className="w-3.5 h-3.5 text-[#C98A2C]" />
            NEVER MISS A DIRECT LANDLORD LISTING
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Get Fresh Rental Alerts in Your Inbox
          </h2>
          <p className="text-xs sm:text-sm text-[#F4F5F1]/80 leading-relaxed">
            Subscribe for weekly updates on newly verified apartments in Gulshan, Banani, Dhanmondi, and Chattogram.
          </p>
        </div>

        <div className="w-full md:w-auto min-w-[320px] max-w-md">
          {isSubscribed ? (
            <div className="bg-[#173B2F] border border-[#C98A2C]/50 rounded-md p-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-[#C98A2C] font-heading font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscription Confirmed!</span>
              </div>
              <p className="font-mono-spec text-xs text-[#F4F5F1]/80">
                You`re now on the priority list for BDT rent alerts.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="bg-white text-[#1B211E] placeholder:text-gray-500 border border-[#D8DBD3] rounded-lg h-10 text-xs px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-[#C98A2C]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto h-10 px-5 bg-[#C98A2C] hover:bg-[#B27822] text-white font-mono-spec text-xs font-bold tracking-wider uppercase shrink-0 shadow-sm rounded-lg inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
          <p className="font-mono-spec text-[10px] text-[#F4F5F1]/60 text-center md:text-left mt-2">
            No spam. Unsubscribe anytime with 1-click.
          </p>
        </div>

      </div>

    </section>
  );
}
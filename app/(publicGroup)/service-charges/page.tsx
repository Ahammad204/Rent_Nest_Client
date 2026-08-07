"use client";

import { Metadata } from "next";
import { useState } from "react";
import { ChevronDown, Flame, Zap, Droplets } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";

export const metadata: Metadata = {
  title: "Service Charges & Titas Gas FAQs | Thikana",
  description: "Frequently asked questions about service charges and utility connections.",
};

const faqData = [
  {
    id: "sc-1",
    icon: Flame,
    question: "What is Titas Gas and how does it affect my rent?",
    answer:
      "Titas Gas is the primary natural gas provider in Bangladesh. Properties with Titas Gas connection typically have lower utility costs. Monthly gas bills are separate from rent and are billed based on metered usage by Titas Gas Distribution Company Ltd.",
  },
  {
    id: "sc-2",
    icon: Flame,
    question: "What is the difference between Titas Gas and LPG?",
    answer:
      "Titas Gas is piped natural gas (PNG) supplied through underground pipelines. LPG (Liquefied Petroleum Gas) uses cylindrical tanks that need periodic refilling. Titas Gas is generally cheaper and more convenient, but not available in all areas. LPG is a common alternative in areas without Titas pipeline coverage.",
  },
  {
    id: "sc-3",
    icon: Zap,
    question: "What is a service charge in Bangladesh rentals?",
    answer:
      "Service charge covers building maintenance costs including lift operation, security guard salaries, common area cleaning, waste management, and building insurance. It is typically charged per square foot and ranges from BDT 8-25 per sq ft monthly depending on building facilities.",
  },
  {
    id: "sc-4",
    icon: Zap,
    question: "Are service charges included in the monthly rent?",
    answer:
      "It varies by property. On Thikana, each listing explicitly states whether service charges are included in the rent or billed separately. Always check the property blueprint for clarification before submitting a rental request.",
  },
  {
    id: "sc-5",
    icon: Droplets,
    question: "What about electricity — DESCO, DPDC, or BREB?",
    answer:
      "Electricity providers in Dhaka include DESCO (Dhaka Electric Supply Company) and DPDC (Dhaka Power Distribution Company). Properties may have metered (prepaid or postpaid) or shared electricity. Thikana listings specify the electricity provider and billing method in the property blueprint.",
  },
  {
    id: "sc-6",
    icon: Droplets,
    question: "Is water supply included in the rent?",
    answer:
      "Most properties include WASA (Water Supply and Sewerage Authority) water in the service charge. However, some buildings have independent water pumps with additional charges. Check the property listing for specific water supply details.",
  },
];

export default function ServiceChargesPage() {
  const [openId, setOpenId] = useState<string | null>("sc-1");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
            FAQs
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Service Charges & Titas Gas FAQs
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about service charges, gas connections,
            and utility billing for rentals in Bangladesh.
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Flame, title: "Titas Gas", desc: "Piped natural gas (PNG) — cheapest option" },
            { icon: Zap, title: "Service Charge", desc: "BDT 8-25/sq ft — covers building maintenance" },
            { icon: Droplets, title: "Water (WASA)", desc: "Usually included in service charge" },
          ].map((item) => (
            <BlueprintCard key={item.title} className="p-4 text-center" accentTick>
              <item.icon className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="font-heading font-bold text-sm text-foreground">{item.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
            </BlueprintCard>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            const IconComp = faq.icon;
            return (
              <BlueprintCard key={faq.id} className="overflow-hidden" accentTick>
                <button
                  onClick={() => toggle(faq.id)}
                  className={`flex items-center justify-between w-full p-4 text-left transition-all ${
                    isOpen ? "text-primary" : "text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComp className="w-4 h-4 text-secondary" />
                    <span className="font-heading font-bold text-sm">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className="w-4 h-4 text-primary shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-200"
                  style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="px-4 pb-4 text-sm text-foreground/80 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </BlueprintCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
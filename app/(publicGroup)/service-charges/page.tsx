import { Metadata } from "next";
import { Flame, Zap, Droplets } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";
import { ServiceChargesFaq } from "../_components/ServiceChargesFaq";

export const metadata: Metadata = {
  title: "Service Charges & Titas Gas FAQs | Thikana",
  description: "Frequently asked questions about service charges and utility connections.",
};

export default function ServiceChargesPage() {
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

        {/* FAQ Accordion (Client Component) */}
        <ServiceChargesFaq />
      </div>
    </div>
  );
}
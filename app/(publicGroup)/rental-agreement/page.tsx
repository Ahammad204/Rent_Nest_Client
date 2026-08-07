import { Metadata } from "next";
import { Scale, FileText, Clock, Banknote } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";

export const metadata: Metadata = {
  title: "Standard Rental Agreement | Thikana",
  description: "Standard rental agreement template compliant with Bangladesh law.",
};

export default function RentalAgreementPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
            LEGAL
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Standard Rental Agreement
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            A standard rental agreement template compliant with Bangladesh rental law,
            used for all leases facilitated through Thikana.
          </p>
        </div>

        {/* Notice */}
        <BlueprintCard className="p-4 border-l-4 border-l-secondary" accentTick>
          <p className="text-xs text-foreground/80 leading-relaxed">
            <strong>Disclaimer:</strong> This is a general template for reference only.
            We recommend consulting a legal professional for specific rental agreements.
          </p>
        </BlueprintCard>

        {/* Sections */}
        <div className="space-y-6">
          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                1. Parties & Property
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Full legal names of landlord and tenant</li>
              <li>National ID / Passport numbers of both parties</li>
              <li>Complete property address with floor and unit number</li>
              <li>Property type and total area (square feet)</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                2. Lease Duration
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Standard lease term: 12 months (minimum 6 months)</li>
              <li>Start date and end date clearly specified</li>
              <li>Renewal terms and notice period (60 days written notice)</li>
              <li>Early termination conditions and penalties</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Banknote className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                3. Financial Terms
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Monthly rent in Bangladeshi Taka (BDT)</li>
              <li>Security deposit amount (typically 2-3 months` rent)</li>
              <li>Payment due date (usually 1st of each month)</li>
              <li>Late payment penalty structure</li>
              <li>Service charge and utility payment responsibilities</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                4. Rights & Obligations
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Landlord`s duty to maintain property in habitable condition</li>
              <li>Tenant`s duty to pay rent on time and maintain cleanliness</li>
              <li>Subletting restrictions and approval requirements</li>
              <li>Property inspection rights with 24-hour notice</li>
              <li>Dispute resolution through mediation or Dhaka courts</li>
            </ul>
          </BlueprintCard>
        </div>
      </div>
    </div>
  );
}
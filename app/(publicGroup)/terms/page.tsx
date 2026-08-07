import { Metadata } from "next";
import { FileText, AlertTriangle, CreditCard, Scale } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";

export const metadata: Metadata = {
  title: "Terms of Service | Thikana",
  description: "Thikana's terms of service — user responsibilities, payment terms, and liability.",
};

export default function TermsPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
            LEGAL
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: August 2026
          </p>
        </div>

        {/* Introduction */}
        <BlueprintCard className="p-6 sm:p-8" accentTick>
          <p className="text-sm text-foreground/80 leading-relaxed">
            By accessing or using Thikana, you agree to these Terms of Service.
            If you do not agree, please discontinue use of the platform.
          </p>
        </BlueprintCard>

        {/* Sections */}
        <div className="space-y-6">
          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                1. User Responsibilities
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Provide accurate and truthful information during registration</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use the platform only for lawful rental transactions</li>
              <li>Do not impersonate others or create fake listings</li>
              <li>Report any suspicious activity or fraudulent listings</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                2. Payment Terms
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>All payments are processed in Bangladeshi Taka (BDT)</li>
              <li>Security deposits and rent are processed through Stripe</li>
              <li>Refunds are subject to the landlord`s cancellation policy</li>
              <li>Thikana charges no hidden fees beyond disclosed service charges</li>
              <li>Digital invoices are provided for all transactions</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                3. Prohibited Activities
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Posting false or misleading property listings</li>
              <li>Harassing, threatening, or defrauding other users</li>
              <li>Circumventing payment processing or fees</li>
              <li>Uploading malicious software or harmful content</li>
              <li>Scraping or collecting user data without consent</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                4. Limitation of Liability
              </h2>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Thikana acts as a marketplace connecting tenants and landlords. We are not a party
              to any rental agreement between users. Thikana is not liable for property disputes,
              damages, or losses arising from rental transactions conducted through the platform.
            </p>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <h2 className="font-heading font-bold text-base text-foreground mb-3">
              5. Governing Law
            </h2>
            <p className="text-sm text-foreground/80 leading-relaxed">
              These Terms are governed by the laws of Bangladesh. Any disputes shall be resolved
              in the courts of Dhaka, Bangladesh.
            </p>
          </BlueprintCard>
        </div>
      </div>
    </div>
  );
}
import { Metadata } from "next";
import { Shield, Lock, Eye, Database } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";

export const metadata: Metadata = {
  title: "Privacy Policy | Thikana",
  description: "Thikana's privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
            LEGAL
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: August 2026
          </p>
        </div>

        {/* Introduction */}
        <BlueprintCard className="p-6 sm:p-8" accentTick>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Thikana Technologies BD Ltd. (`Thikana`, `we`, `us`) respects your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our rental marketplace platform.
          </p>
        </BlueprintCard>

        {/* Sections */}
        <div className="space-y-6">
          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                1. Information We Collect
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li><strong>Account Data:</strong> Name, email, phone number, role (tenant/landlord)</li>
              <li><strong>Property Listings:</strong> Images, location, rent price, specifications</li>
              <li><strong>Payment Data:</strong> Stripe-processed transactions (we never store card numbers)</li>
              <li><strong>Usage Data:</strong> Pages visited, search queries, device information</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                2. How We Use Your Information
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Process rental requests and connect tenants with landlords</li>
              <li>Verify landlord identities and property listings</li>
              <li>Process secure payments through Stripe</li>
              <li>Send transactional emails (request confirmations, approvals)</li>
              <li>Improve platform features and user experience</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                3. Data Protection
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>All data is encrypted in transit (TLS 1.3) and at rest</li>
              <li>Payment processing handled exclusively by Stripe (PCI DSS compliant)</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls limit internal data access to authorized personnel</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                4. Your Rights
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Access and download your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <h2 className="font-heading font-bold text-base text-foreground mb-3">
              5. Contact Us
            </h2>
            <p className="text-sm text-foreground/80 leading-relaxed">
              For privacy-related inquiries, contact us at{" "}
              <span className="text-secondary font-semibold">privacy@thikana.com.bd</span>{" "}
              or call our helpline at <span className="text-secondary font-semibold">+880 9612-736863</span>.
            </p>
          </BlueprintCard>
        </div>
      </div>
    </div>
  );
}
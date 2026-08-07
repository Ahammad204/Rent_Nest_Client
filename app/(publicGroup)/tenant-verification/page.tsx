import { Metadata } from "next";
import { ShieldCheck, FileCheck, UserCheck, Clock } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";

export const metadata: Metadata = {
  title: "Tenant Verification Process | Thikana",
  description: "How Thikana verifies tenants for landlord confidence.",
};

export default function TenantVerificationPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
            VERIFICATION
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Tenant Verification Process
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Thikana verifies tenant identities to build trust between tenants and
            landlords across Bangladesh.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary text-white font-mono-spec font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h2 className="font-heading font-bold text-base text-foreground">
                Register Account
              </h2>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Create a tenant account with your full name, email, and phone number.
              Verify your email address through the confirmation link.
            </p>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary text-white font-mono-spec font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h2 className="font-heading font-bold text-base text-foreground">
                Submit ID Document
              </h2>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Upload a valid government-issued ID (National ID, Passport, or Driving License).
              Our team reviews documents within 24-48 hours.
            </p>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary text-white font-mono-spec font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h2 className="font-heading font-bold text-base text-foreground">
                Profile Verification
              </h2>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Complete your tenant profile with employment details and references.
              Verified tenants receive a `Verified` badge on their profile.
            </p>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary text-white font-mono-spec font-bold text-sm flex items-center justify-center">
                4
              </div>
              <h2 className="font-heading font-bold text-base text-foreground">
                Start Browsing
              </h2>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Once verified, you can submit rental requests to landlords.
              Verified tenants are prioritized in landlord reviews.
            </p>
          </BlueprintCard>
        </div>

        {/* Benefits */}
        <BlueprintCard className="p-6 sm:p-8" accentTick>
          <h2 className="font-heading font-bold text-base text-foreground mb-4">
            Why Get Verified?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: "Build Trust", desc: "Landlords prefer verified tenants" },
              { icon: FileCheck, title: "Faster Approvals", desc: "Get approved 3x faster" },
              { icon: UserCheck, title: "Priority Access", desc: "Early access to new listings" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <item.icon className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <div className="font-heading font-bold text-sm text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </BlueprintCard>
      </div>
    </div>
  );
}
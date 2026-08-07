import { Metadata } from "next";
import { Camera, CheckCircle, AlertCircle, Building2 } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";

export const metadata: Metadata = {
  title: "Landlord Guidelines | Thikana",
  description: "Guidelines for landlords listing properties on Thikana.",
};

export default function LandlordGuidelinesPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
            FOR LANDLORDS
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Landlord Guidelines
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about listing your property on Thikana
            and managing tenant requests.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                1. Listing Requirements
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>You must be the legal owner or authorized agent of the property</li>
              <li>Provide accurate rent pricing in Bangladeshi Taka (BDT)</li>
              <li>Include complete property specifications (bedrooms, bathrooms, area)</li>
              <li>Specify utility connections (Titas Gas, LPG, electricity provider)</li>
              <li>Indicate whether service charges are included in rent</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                2. Photo Guidelines
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Upload minimum 3 high-quality photos of the property</li>
              <li>Include photos of all rooms, kitchen, bathrooms, and exterior</li>
              <li>Photos must be current and accurately represent the property</li>
              <li>No watermarks, logos, or misleading editing</li>
              <li>Resolution: minimum 800x600 pixels</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                3. Tenant Requests
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Review tenant requests within 48 hours</li>
              <li>You can approve or decline any request with a reason</li>
              <li>Approved tenants receive your contact details for scheduling tours</li>
              <li>Complete the lease agreement through the platform</li>
            </ul>
          </BlueprintCard>

          <BlueprintCard className="p-6" accentTick>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-secondary" />
              <h2 className="font-heading font-bold text-base text-foreground">
                4. Prohibited Content
              </h2>
            </div>
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
              <li>Fake or misleading property listings</li>
              <li>Properties with ongoing legal disputes</li>
              <li>Discriminatory rental terms based on race, religion, or gender</li>
              <li>Properties that do not meet basic safety standards</li>
            </ul>
          </BlueprintCard>
        </div>
      </div>
    </div>
  );
}
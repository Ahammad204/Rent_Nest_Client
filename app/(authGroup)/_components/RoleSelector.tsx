"use client";
import { Building, CheckCircle2, Key } from "lucide-react";

interface RoleSelectorProps {
  value: "TENANT" | "LANDLORD";
  onChange: (role: "TENANT" | "LANDLORD") => void;
  error?: string;
}

export function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  return (
    <div>
      <label className="block font-mono-spec text-xs font-bold text-primary uppercase tracking-wider mb-2">
        I AM JOINING AS *
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Tenant Card */}
        <button
          type="button"
          onClick={() => onChange("TENANT")}
          className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all select-none text-left ${
            value === "TENANT"
              ? "border-primary bg-primary/5 text-primary shadow-sm"
              : "border-border bg-card text-foreground hover:border-primary/40"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <Key className="w-5 h-5" />
            </div>
            {value === "TENANT" && (
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            )}
          </div>
          <div className="mt-3">
            <div className="font-heading font-bold text-sm text-foreground">
              I`m looking to rent
            </div>
            <div className="font-sans text-[11px] text-gray-500 mt-0.5 leading-snug">
              Tenant profile to bookmark homes & send rental requests.
            </div>
          </div>
        </button>

        {/* Landlord Card */}
        <button
          type="button"
          onClick={() => onChange("LANDLORD")}
          className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all select-none text-left ${
            value === "LANDLORD"
              ? "border-primary bg-primary/5 text-primary shadow-sm"
              : "border-border bg-card text-foreground hover:border-primary/40"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="p-2 rounded bg-secondary/10 text-secondary">
              <Building className="w-5 h-5" />
            </div>
            {value === "LANDLORD" && (
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            )}
          </div>
          <div className="mt-3">
            <div className="font-heading font-bold text-sm text-foreground">
              I want to list a property
            </div>
            <div className="font-sans text-[11px] text-gray-500 mt-0.5 leading-snug">
              Landlord account to post apartments & manage inquiries.
            </div>
          </div>
        </button>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-sans">{error}</p>
      )}
    </div>
  );
}

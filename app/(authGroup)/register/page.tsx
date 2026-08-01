"use client";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  CheckCircle2,
  Home,
  Key,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { BlueprintCard } from "../_components/BlueprintCard";

export default function RegisterPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-[#F4F5F1]">
      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded bg-[#1F4D3E] text-white flex items-center justify-center font-bold font-mono-spec border border-[#173B2F] shadow-xs">
              <Home className="w-5 h-5 text-[#C98A2C]" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-[#1B211E]">
              Rent<span className="text-[#1F4D3E]">Nest</span>
            </span>
          </Link>
          <h1 className="font-heading text-xl font-bold text-[#1B211E]">
            Create your RentNest Account
          </h1>
          <p className="font-sans text-xs text-gray-600">
            Join thousands of verified tenants and landlords across Bangladesh.
          </p>
        </div>
        {/* Register Card */}
        <BlueprintCard
          className="p-6 sm:p-8 bg-white shadow-md border border-[#D8DBD3]"
          accentTick
        >
          <form className="space-y-5">
            {/* Role Selector */}
            <div>
              <label className="block font-mono-spec text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-2">
                I AM JOINING AS *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Tenant Card */}
                <button
                  type="button"
                  className="relative p-4 rounded-lg border-2 border-[#1F4D3E] bg-[#1F4D3E]/5 text-[#1F4D3E] shadow-sm cursor-pointer transition-all select-none text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded bg-[#1F4D3E]/10 text-[#1F4D3E]">
                      <Key className="w-5 h-5" />
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#1F4D3E] shrink-0" />
                  </div>
                  <div className="mt-3">
                    <div className="font-heading font-bold text-sm text-[#1B211E]">
                      I&apos;m looking to rent
                    </div>
                    <div className="font-sans text-[11px] text-gray-500 mt-0.5 leading-snug">
                      Tenant profile to bookmark homes &amp; send rental
                      requests.
                    </div>
                  </div>
                </button>
                {/* Landlord Card */}
                <button
                  type="button"
                  className="relative p-4 rounded-lg border-2 border-[#D8DBD3] bg-white text-[#1B211E] hover:border-[#1F4D3E]/40 cursor-pointer transition-all select-none text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded bg-[#C98A2C]/10 text-[#C98A2C]">
                      <Building className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="font-heading font-bold text-sm text-[#1B211E]">
                      I want to list a property
                    </div>
                    <div className="font-sans text-[11px] text-gray-500 mt-0.5 leading-snug">
                      Landlord account to post apartments &amp; manage
                      inquiries.
                    </div>
                  </div>
                </button>
              </div>
            </div>
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block font-mono-spec text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5"
              >
                FULL NAME *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Masud Parvez"
                  autoComplete="name"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E] transition-colors"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-mono-spec text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5"
              >
                EMAIL ADDRESS *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. masud@example.com"
                  autoComplete="email"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E] transition-colors"
                />
              </div>
            </div>
            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block font-mono-spec text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5"
              >
                PHONE NUMBER *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+880 1711-000000"
                  autoComplete="tel"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E] transition-colors"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block font-mono-spec text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5"
              >
                PASSWORD *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E] transition-colors"
                />
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#1F4D3E] hover:bg-[#173B2F] text-white font-mono-spec font-bold text-xs rounded-md shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>COMPLETE REGISTRATION</span>
              <ArrowRight className="w-4 h-4 text-[#C98A2C]" />
            </button>
          </form>
          {/* Footer Link to Login */}
          <div className="mt-6 pt-5 border-t border-[#D8DBD3] text-center">
            <p className="text-xs text-gray-600 font-sans">
              Already have an account?
              <Link
                href="/login"
                className="font-mono-spec font-bold text-[#1F4D3E] hover:underline"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </BlueprintCard>
        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="font-mono-spec text-xs text-gray-500 hover:text-[#1F4D3E] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

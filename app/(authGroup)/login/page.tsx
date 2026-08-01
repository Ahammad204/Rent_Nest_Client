"use client";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { BlueprintCard } from "../_components/BlueprintCard";
export default function LoginPage() {
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 py-12
     bg-[#F4F5F1]"
    >
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <span
              className="font-heading font-bold text-2xl tracking-tight
             text-[#1B211E]"
            >
              Rent<span className="text-[#1F4D3E]">Nest</span>
            </span>
          </Link>
          <h1 className="font-heading text-xl font-bold text-[#1B211E]">
            Sign in to your account
          </h1>
          <p className="font-sans text-xs text-gray-600">
            Access verified listings, landlord inquiries, and saved properties.
          </p>
        </div>
        {/* Login Card */}
        <BlueprintCard
          className="p-6 sm:p-8 bg-white shadow-md border border-[#D8DBD3]"
          accentTick
        >
          <form className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block font-mono-spec text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5 items-center justify-between"
              >
                <span>EMAIL ADDRESS *</span>
                <span className="text-[10px] text-gray-400 font-normal">
                  REQUIRED
                </span>
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
            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block font-mono-spec text-xs font-bold text-[#1F4D3E] uppercase tracking-wider"
                >
                  PASSWORD *
                </label>
                <Link
                  href="/forgot-password"
                  className="font-mono-spec text-[11px] text-[#C98A2C] hover:underline hover:text-[#AF7623]"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
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
              <span>SIGN IN TO RENTNEST</span>
              <ArrowRight className="w-4 h-4 text-[#C98A2C]" />
            </button>
          </form>
          {/* Footer Link */}
          <div className="mt-6 pt-5 border-t border-[#D8DBD3] text-center">
            <p className="text-xs text-gray-600 font-sans">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="font-mono-spec font-bold text-[#1F4D3E] hover:underline"
              >
                Create an account
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

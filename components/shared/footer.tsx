"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhoneCall, Mail, MapPin } from "lucide-react";

export function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-primary text-white border-t border-[primary/80] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
        {/* Column 1: Brand & Logo */}
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-secondary text-white font-mono flex items-center justify-center font-bold text-sm tracking-tighter">
              TK
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-white">
              Thik<span className="text-secondary">ana</span>
            </span>
          </Link>

          <p className="text-xs text-white/80 leading-relaxed max-w-xs">
            Bangladesh`s premier rental property marketplace connecting tenants
            directly with verified landlords across Dhaka, Chattogram, and
            Sylhet.
          </p>

          <div className="font-mono-spec text-[10px] text-secondary bg-black/20 px-2.5 py-1 rounded border border-[secondary]/30 inline-block">
            ALL PRICING IN BANGLADESHI TAKA (BDT)
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://facebook.com/thikana"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/thikana"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <MapPin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/thikana"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Explore Neighborhoods */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">
            Popular Neighborhoods
          </h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li>
              <button
                onClick={() =>
                  router.push("/properties?location=Dhanmondi, Dhaka")
                }
                className="hover:text-secondary transition-colors"
              >
                Dhanmondi, Dhaka
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  router.push("/properties?location=Gulshan, Dhaka")
                }
                className="hover:text-secondary transition-colors"
              >
                Gulshan 1 & 2, Dhaka
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  router.push("/properties?location=Uttara, Dhaka")
                }
                className="hover:text-secondary transition-colors"
              >
                Uttara Sectors 1-14, Dhaka
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  router.push("/properties?location=GEC, Chattogram")
                }
                className="hover:text-secondary transition-colors"
              >
                GEC Circle & Nasirabad, Chattogram
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  router.push("/properties?location=Agrabad, Chattogram")
                }
                className="hover:text-secondary transition-colors"
              >
                Agrabad C/A, Chattogram
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: For Landlords */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">
            For Landlords & Owners
          </h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li>
              <button
                onClick={() =>
                  router.push("/landlord-dashboard/properties/new")
                }
                className="hover:text-secondary transition-colors"
              >
                Post Property Listing
              </button>
            </li>
            <li>
              <Link
                href="/tenant-verification"
                className="hover:text-secondary transition-colors"
              >
                Tenant Verification Process
              </Link>
            </li>
            <li>
              <Link
                href="/rental-agreement"
                className="hover:text-secondary transition-colors"
              >
                Standard Rental Agreement (BD Law)
              </Link>
            </li>
            <li>
              <Link
                href="/service-charges"
                className="hover:text-secondary transition-colors"
              >
                Service Charge & Titas Gas FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Verification */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">
            Support & Verification
          </h4>
          <div className="space-y-2 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-secondary" />
              <span>+880 9612-736863 (Thikana Helpline)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-secondary" />
              <span>support@thikana.com.bd</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>Level 6, Gulshan Avenue, Dhaka-1212</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 font-mono-spec">
        <div>
          © {new Date().getFullYear()} Thikana Technologies BD Ltd. All rights
          reserved.
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-4">
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms of Service
          </Link>
          <Link href="/landlord-guidelines" className="hover:text-white">
            Landlord Guidelines
          </Link>
        </div>
      </div>
    </footer>
  );
}
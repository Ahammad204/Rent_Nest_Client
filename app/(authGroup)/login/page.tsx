import Link from "next/link";
import { LoginForm } from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#F4F5F1]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="font-heading font-bold text-2xl tracking-tight text-[#1B211E]">
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

        <LoginForm />

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
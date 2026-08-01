import Link from "next/link";
import { RegisterForm } from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-[#F4F5F1]">
      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
          
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

        <RegisterForm />

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
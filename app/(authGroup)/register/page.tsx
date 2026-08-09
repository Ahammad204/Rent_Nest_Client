import Link from "next/link";
import { RegisterForm } from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-[background]">
      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
          
            <span className="font-heading font-bold text-2xl tracking-tight text-foreground">
              Thik<span className="text-primary">ana</span>
            </span>
          </Link>
          <h1 className="font-heading text-xl font-bold text-foreground">
            Create your Thikana Account
          </h1>
          <p className="font-sans text-xs text-muted-foreground">
            Join thousands of verified tenants and landlords across Bangladesh.
          </p>
        </div>

        <RegisterForm />

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="font-mono-spec text-xs text-muted-foreground hover:text-primary hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
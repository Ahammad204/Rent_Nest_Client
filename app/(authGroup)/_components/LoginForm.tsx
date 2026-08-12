"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { FormField } from "./FormField";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { loginUser, googleLoginUser } from "../_actions/authActions";
import { ApiService } from "@/service/api";
import { decodeToken } from "@/utils/jwt";
import { toast } from "sonner";
import { BlueprintCard } from "@/components/BlueprintCard";
import { GoogleLoginButton } from "./GoogleLoginButton";

const DEMO_ACCOUNTS = [
  { label: "Admin", email: "Admin@gmail.com", password: "123456" },
  {
    label: "Landlord",
    email: "landlord.demo@rentnest.com",
    password: "Landlord@2026",
  },
  { label: "Tenant", email: "Masud@gmail.com", password: "123456" },
];

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");
    try {
      const res = await loginUser(data.email, data.password);
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Signed in successfully!");

      const decoded = decodeToken(res.data.accessToken);
      if (decoded?.role === "LANDLORD") router.push("/landlord-dashboard");
      else if (decoded?.role === "ADMIN") router.push("/admin-dashboard");
      else router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiService) {
        toast.error("An unexpected error occurred. Please try again.");
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) return;
    const res = await googleLoginUser(credentialResponse.credential);
    if (res.success) {
      toast.success("Signed in with Google!");
      const decoded = decodeToken(res.data.accessToken);
      if (decoded?.role === "LANDLORD") router.push("/landlord-dashboard");
      else if (decoded?.role === "ADMIN") router.push("/admin-dashboard");
      else router.push("/dashboard");
    } else {
      toast.error(res.message || "Google login failed");
    }
  };

  return (
    <BlueprintCard
      className="p-6 sm:p-8 bg-card shadow-md border border-border"
      accentTick
    >
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm dark:bg-red-950 dark:border-red-800 dark:text-red-300">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          id="email"
          label="EMAIL ADDRESS"
          type="email"
          placeholder="your@email.com"
          icon={Mail}
          required
          autoComplete="email"
          register={register("email")}
          error={errors.email?.message}
          hint="REQUIRED"
        />

        <FormField
          id="password"
          label="PASSWORD"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          required
          autoComplete="current-password"
          register={register("password")}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between mb-1.5">
          <span />
          <Link
            href="/forgot-password"
            className="font-mono-spec text-[11px] text-secondary hover:underline hover:text-[#AF7623]"
          >
            Forgot password?
          </Link>
        </div>

        {/* Demo Login Buttons */}
        <div className="space-y-2">
          <p className="font-mono-spec text-[10px] text-muted-foreground uppercase tracking-wider text-center">
            Quick Demo Access
          </p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_ACCOUNTS.map((demo) => (
              <button
                key={demo.label}
                type="button"
                onClick={() => {
                  setValue("email", demo.email, { shouldValidate: true });
                  setValue("password", demo.password, { shouldValidate: true });
                }}
                className="px-2 py-1.5 text-[10px] font-bold border border-border rounded-md hover:bg-muted transition-colors cursor-pointer"
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-primary hover:bg-primary/80 disabled:opacity-60 disabled:cursor-not-allowed text-white font-mono-spec font-bold text-xs rounded-md shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <span>SIGNING IN...</span>
          ) : (
            <>
              <span>SIGN IN TO Thikana</span>
              <ArrowRight className="w-4 h-4 text-secondary" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}

      <div className="mt-6 pt-5 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono-spec text-[10px] text-muted-foreground uppercase">
            or continue with
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <GoogleLoginButton />
      </div>

      <div className="mt-6 pt-5 border-t border-border text-center">
        <p className="text-xs text-muted-foreground font-sans">
          Don`t have an account?{" "}
          <Link
            href="/register"
            className="font-mono-spec font-bold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </BlueprintCard>
  );
}

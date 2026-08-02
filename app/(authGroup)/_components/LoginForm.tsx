"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { BlueprintCard } from "./BlueprintCard";
import { FormField } from "./FormField";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { loginUser } from "../_actions/authActions";
import { ApiService } from "@/service/api";
import { decodeToken } from "@/utils/jwt";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
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

  return (
    <BlueprintCard
      className="p-6 sm:p-8 bg-white shadow-md border border-[#D8DBD3]"
      accentTick
    >
      {serverError && (
        <div className="mb-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          id="email"
          label="EMAIL ADDRESS"
          type="email"
          placeholder="e.g. masud@example.com"
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
            className="font-mono-spec text-[11px] text-[#C98A2C] hover:underline hover:text-[#AF7623]"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-[#1F4D3E] hover:bg-[#173B2F] disabled:opacity-60 disabled:cursor-not-allowed text-white font-mono-spec font-bold text-xs rounded-md shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <span>SIGNING IN...</span>
          ) : (
            <>
              <span>SIGN IN TO RENTNEST</span>
              <ArrowRight className="w-4 h-4 text-[#C98A2C]" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#D8DBD3] text-center">
        <p className="text-xs text-gray-600 font-sans">
          Don`t have an account?
          <Link
            href="/register"
            className="font-mono-spec font-bold text-[#1F4D3E] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </BlueprintCard>
  );
}

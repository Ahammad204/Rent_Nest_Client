"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { FormField } from "./FormField";
import { RoleSelector } from "./RoleSelector";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { registerUser } from "../_actions/authActions";
import { ApiService } from "@/service/api";
import { toast } from "sonner";
import { BlueprintCard } from "@/components/BlueprintCard";
import { GoogleLoginButton } from "./GoogleLoginButton";

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "TENANT",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");
    setSuccessMessage("");
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      });
      toast.success("Account created successfully!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      if (err instanceof ApiService) {
        toast.error("An unexpected error occurred. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm dark:bg-green-950 dark:border-green-800 dark:text-green-300">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <RoleSelector
          value={selectedRole}
          onChange={(role) => setValue("role", role, { shouldValidate: true })}
          error={errors.role?.message}
        />

        <FormField
          id="name"
          label="FULL NAME"
          placeholder="Enter your full name"
          icon={User}
          required
          autoComplete="name"
          register={register("name")}
          error={errors.name?.message}
        />

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
        />

        <FormField
          id="phone"
          label="PHONE NUMBER"
          type="tel"
          placeholder="01XXXXXXXXX"
          icon={Phone}
          required
          autoComplete="tel"
          register={register("phone")}
          error={errors.phone?.message}
        />

        <FormField
          id="password"
          label="PASSWORD"
          type="password"
          placeholder="At least 6 characters"
          icon={Lock}
          required
          autoComplete="new-password"
          register={register("password")}
          error={errors.password?.message}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-primary hover:bg-primary/80 disabled:opacity-60 disabled:cursor-not-allowed text-white font-mono-spec font-bold text-xs rounded-md shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <span>CREATING ACCOUNT...</span>
          ) : (
            <>
              <span>COMPLETE REGISTRATION</span>
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-mono-spec font-bold text-primary hover:underline"
          >
            Sign in instead
          </Link>
        </p>
      </div>
    </BlueprintCard>
  );
}

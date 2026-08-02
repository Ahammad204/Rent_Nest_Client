"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { BlueprintCard } from "./BlueprintCard";
import { FormField } from "./FormField";
import { RoleSelector } from "./RoleSelector";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { registerUser } from "../_actions/authActions";
import { ApiService } from "@/service/api";
import { toast } from "sonner";

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
      className="p-6 sm:p-8 bg-white shadow-md border border-[#D8DBD3]"
      accentTick
    >
      {serverError && (
        <div className="mb-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
          {serverError}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 px-4 py-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-xs font-sans">
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
          placeholder="e.g. Masud Parvez"
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
          placeholder="e.g. masud@example.com"
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
          placeholder="+880 1711-000000"
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
          className="w-full py-2.5 px-4 bg-[#1F4D3E] hover:bg-[#173B2F] disabled:opacity-60 disabled:cursor-not-allowed text-white font-mono-spec font-bold text-xs rounded-md shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <span>CREATING ACCOUNT...</span>
          ) : (
            <>
              <span>COMPLETE REGISTRATION</span>
              <ArrowRight className="w-4 h-4 text-[#C98A2C]" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#D8DBD3] text-center">
        <p className="text-xs text-gray-600 font-sans">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-mono-spec font-bold text-[#1F4D3E] hover:underline"
          >
            Sign in instead
          </Link>
        </p>
      </div>
    </BlueprintCard>
  );
}

"use client";
import type { LucideIcon } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: LucideIcon;
  required?: boolean;
  autoComplete?: string;
  register: UseFormRegisterReturn;
  error?: string;
  hint?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
  autoComplete,
  register,
  error,
  hint,
}: FormFieldProps) {
  const inputClass =
    "w-full pl-9 pr-3 py-2 text-sm bg-card border rounded-md text-foreground focus:outline-none focus:ring-1 transition-colors";

  const inputStyle = error
    ? `${inputClass} border-red-500 focus:border-red-500 focus:ring-red-500`
    : `${inputClass} border-border focus:border-primary focus:ring-primary`;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor={id}
          className="block font-mono-spec text-xs font-bold text-primary uppercase tracking-wider"
        >
          {label} {required && "*"}
        </label>
        {hint && (
          <span className="text-[10px] text-gray-400 font-sans">{hint}</span>
        )}
      </div>
      <div className="relative">
        <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register}
          className={inputStyle}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-sans">{error}</p>
      )}
    </div>
  );
}
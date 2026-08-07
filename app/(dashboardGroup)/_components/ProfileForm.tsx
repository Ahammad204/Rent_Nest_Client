"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Phone, FileText, Save, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "../_actions/dashboardActions";
import { profileSchema, type ProfileFormData } from "@/lib/validations/profile";
import type { UserProfile } from "@/lib/types";

interface ProfileFormProps {
  user: UserProfile;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      phone: user.profiles?.[0]?.phone || "",
      bio: user.profiles?.[0]?.bio || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        name: data.name,
        phone: data.phone || undefined,
        bio: data.bio || undefined,
      });
      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Avatar Section */}
      <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-xl">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <div className="font-heading font-bold text-sm text-foreground">{user.name}</div>
          <div className="font-mono-spec text-xs text-primary">{user.email}</div>
          <div className="font-mono-spec text-[10px] text-muted-foreground mt-0.5">
            {user.role} • Member since {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 p-4 bg-card border border-border rounded-lg">
        <div className="space-y-1.5">
          <label className="font-mono-spec text-[10px] text-primary font-semibold flex items-center gap-1">
            <User className="w-3 h-3" />
            FULL NAME
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full h-9 px-3 text-xs bg-muted border border-border rounded-md focus:outline-none focus:border-primary"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="font-mono-spec text-[10px] text-primary font-semibold flex items-center gap-1">
            <Phone className="w-3 h-3" />
            PHONE NUMBER
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full h-9 px-3 text-xs bg-muted border border-border rounded-md focus:outline-none focus:border-primary"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="font-mono-spec text-[10px] text-primary font-semibold flex items-center gap-1">
            <FileText className="w-3 h-3" />
            BIO
          </label>
          <textarea
            {...register("bio")}
            rows={3}
            className="w-full px-3 py-2 text-xs bg-muted border border-border rounded-md focus:outline-none focus:border-primary resize-none"
            placeholder="Tell us about yourself..."
          />
          {errors.bio && (
            <p className="text-xs text-destructive">{errors.bio.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-9 px-5 bg-primary hover:bg-primary/80 disabled:opacity-50
         text-primary-foreground text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-3.5 h-3.5" />
            Save Changes
          </>
        )}
      </button>
    </form>
  );
}
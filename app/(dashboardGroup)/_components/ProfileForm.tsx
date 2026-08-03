"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Phone, FileText, Save, Loader2 } from "lucide-react";
import { updateProfile } from "../_actions/dashboardActions";
import type { UserProfile } from "@/lib/types";

interface ProfileFormProps {
  user: UserProfile;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.profiles?.[0]?.phone || "",
    bio: user.profiles?.[0]?.bio || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone || undefined,
        bio: formData.bio || undefined,
      });
      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Avatar Section */}
      <div className="flex items-center gap-4 p-4 bg-white border border-[#D8DBD3] rounded-lg">
        <div className="w-16 h-16 rounded-full bg-[#1F4D3E] text-white flex items-center justify-center font-heading font-bold text-xl">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <div className="font-heading font-bold text-sm text-[#1B211E]">{user.name}</div>
          <div className="font-mono-spec text-xs text-[#1F4D3E]">{user.email}</div>
          <div className="font-mono-spec text-[10px] text-gray-500 mt-0.5">
            {user.role} • Member since {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 p-4 bg-white border border-[#D8DBD3] rounded-lg">
        <div className="space-y-1.5">
          <label className="font-mono-spec text-[10px] text-[#1F4D3E] font-semibold flex items-center gap-1">
            <User className="w-3 h-3" />
            FULL NAME
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-9 px-3 text-xs bg-[#F4F5F1] border border-[#D8DBD3] rounded-md focus:outline-none focus:border-[#1F4D3E]"
            placeholder="Enter your name"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-mono-spec text-[10px] text-[#1F4D3E] font-semibold flex items-center gap-1">
            <Phone className="w-3 h-3" />
            PHONE NUMBER
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full h-9 px-3 text-xs bg-[#F4F5F1] border border-[#D8DBD3] rounded-md focus:outline-none focus:border-[#1F4D3E]"
            placeholder="01XXXXXXXXX"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-mono-spec text-[10px] text-[#1F4D3E] font-semibold flex items-center gap-1">
            <FileText className="w-3 h-3" />
            BIO
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 text-xs bg-[#F4F5F1] border border-[#D8DBD3] rounded-md focus:outline-none focus:border-[#1F4D3E] resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="h-9 px-5 bg-[#1F4D3E] hover:bg-[#173B2F] disabled:opacity-50
         text-white text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-colors"
      >
        {isLoading ? (
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
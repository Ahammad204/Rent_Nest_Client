"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Sun, Moon, Monitor, Bell, Shield } from "lucide-react";
import type { UserProfile } from "@/lib/types";


interface SettingsFormProps {
  user: UserProfile;
}

export function SettingsForm({ user }: SettingsFormProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Appearance */}
      <div className="p-4 bg-card border border-border rounded-lg space-y-4">
        <h2 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
          {mounted && theme === "dark" ? (
            <Moon className="w-4 h-4 text-primary" />
          ) : (
            <Sun className="w-4 h-4 text-primary" />
          )}
          Appearance
        </h2>
        <p className="text-xs text-muted-foreground">
          Choose how Thikana looks on your device.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "light", label: "Light", icon: Sun },
            { value: "dark", label: "Dark", icon: Moon },
            { value: "system", label: "System", icon: Monitor },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
                mounted && theme === option.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-muted text-muted-foreground"
              }`}
            >
              <option.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      {/* <div className="p-4 bg-card border border-border rounded-lg space-y-4">
        <h2 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          Notifications
        </h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm text-foreground">Email notifications</p>
              <p className="text-xs text-muted-foreground">Receive updates about your rentals</p>
            </div>
            <div className="relative">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm text-foreground">Payment reminders</p>
              <p className="text-xs text-muted-foreground">Get notified before rent is due</p>
            </div>
            <div className="relative">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm text-foreground">New listing alerts</p>
              <p className="text-xs text-muted-foreground">Notify when new properties match your search</p>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
            </div>
          </label>
        </div>
      </div> */}

      {/* Account */}
      <div className="p-4 bg-card border border-border rounded-lg space-y-4">
        <h2 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Account
        </h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm text-foreground">Email</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm text-foreground">Role</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-foreground">Member since</p>
              <p className="text-xs text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
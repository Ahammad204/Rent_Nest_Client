"use client";

import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { googleLoginUser } from "../_actions/authActions";
import { decodeToken } from "@/utils/jwt";
import { toast } from "sonner";

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
}

export function GoogleLoginButton({ onSuccess }: GoogleLoginButtonProps) {
  const router = useRouter();

  const handleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) return;

    const res = await googleLoginUser(credentialResponse.credential);
    if (res.success) {
      toast.success("Signed in with Google!");
      onSuccess?.();
      const decoded = decodeToken(res.data.accessToken);
      if (decoded?.role === "LANDLORD") router.push("/landlord-dashboard");
      else if (decoded?.role === "ADMIN") router.push("/admin-dashboard");
      else router.push("/dashboard");
    } else {
      toast.error(res.message || "Google login failed");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google login failed")}
      />
    </div>
  );
}
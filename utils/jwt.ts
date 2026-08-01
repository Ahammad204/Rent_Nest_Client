import { jwtDecode } from "jwt-decode";
import type { UserPayload } from "@/lib/types";

export function decodeToken(token: string): UserPayload | null {
  try {
    return jwtDecode<UserPayload>(token);
  } catch {
    return null;
  }
}
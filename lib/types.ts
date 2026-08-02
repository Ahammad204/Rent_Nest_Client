export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  name?: string;
  message: string;
  error?: string;
}

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
  profiles: {
    id: string;
    phone: string | null;
    bio: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
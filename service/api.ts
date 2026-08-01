export class ApiService extends Error {
  statusCode: number;
  success: boolean;

  constructor(message: string, statusCode: number, success = false) {
    super(message);
    this.name = "ApiServiceError";
    this.statusCode = statusCode;
    this.success = success;
  }
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  };

  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new ApiService(
      data.message || "Something went wrong",
      data.statusCode || res.status,
      false
    );
  }

  return data;
}

export const api = {
  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  get: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "GET" }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
};
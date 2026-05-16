const rawBaseUrl = process.env.REACT_APP_API_URL || "/api";
const BASE_URL = rawBaseUrl.replace(/\/$/, "");

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const apiFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = (await res.json()) as ApiResponse<T>;

  if (!res.ok || !data.success) {
    throw new Error(data.error || "API Error");
  }

  return data.data as T;
};

"use client";

function getToken(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("admin_token") ?? "";
}

export function adminFetch(input: string, init?: RequestInit): Promise<Response> {
  const token = getToken();
  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...(token ? { "x-admin-token": token } : {}),
    },
  });
}

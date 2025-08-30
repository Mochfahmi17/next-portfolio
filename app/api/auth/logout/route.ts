import { apiBaseUrl } from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch(`${apiBaseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  const setCookie = res.headers.get("set-cookie");

  const response = NextResponse.json(data, { status: res.status });
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }
  return response;
}

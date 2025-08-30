import { apiBaseUrl } from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // Ambil response JSON dari backend
  const data = await res.json().catch(() => ({}));

  // Ambil cookie dari backend
  const setCookie = res.headers.get("set-cookie");

  // Balikin response ke client
  const response = NextResponse.json(data, { status: res.status });

  // Teruskan Set-Cookie dari backend → supaya tersimpan di domain frontend (localhost:3000 atau app domainmu)
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}

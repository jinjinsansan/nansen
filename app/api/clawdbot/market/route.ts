import { NextResponse } from "next/server";
import { mockMarket } from "@/lib/data/mockData";
import { ensureClawdbotAuth } from "@/lib/api/auth";

export async function GET(request: Request) {
  const unauthorized = ensureClawdbotAuth(request);
  if (unauthorized) return unauthorized;

  return NextResponse.json({ success: true, data: mockMarket });
}

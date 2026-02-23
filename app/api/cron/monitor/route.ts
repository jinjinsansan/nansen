import { NextResponse } from "next/server";
import { ensureCronAuth } from "@/lib/api/auth";
import { mockWallets, mockMarket } from "@/lib/data/mockData";
import { NansenClient } from "@/lib/nansen/client";

export async function POST(request: Request) {
  const unauthorized = ensureCronAuth(request);
  if (unauthorized) return unauthorized;

  const client = new NansenClient();
  let source: "live" | "fallback" = "live";
  let error: string | undefined;
  let activity = mockMarket.smartMoneyActivity;

  try {
    activity = await client.fetchSmartMoneyActivity();
  } catch (err) {
    source = "fallback";
    error = err instanceof Error ? err.message : "Unknown error";
    // fallback keeps mock activity
    console.warn("[cron/monitor] Nansen fallback:", error);
  }

  const alert = activity[0] ?? null;

  return NextResponse.json({
    success: true,
    checked_wallets: mockWallets.length,
    alert,
    source,
    error,
  });
}

export async function GET(request: Request) {
  return POST(request);
}

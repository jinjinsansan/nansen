import { NextResponse } from "next/server";
import { ensureClawdbotAuth } from "@/lib/api/auth";
import { mockMarket } from "@/lib/data/mockData";
import { NansenClient } from "@/lib/nansen/client";

export async function GET(request: Request) {
  const unauthorized = ensureClawdbotAuth(request);
  if (unauthorized) return unauthorized;

  const client = new NansenClient();
  let activity = mockMarket.smartMoneyActivity;
  let source: "live" | "fallback" = "live";
  let error: string | undefined;

  try {
    activity = await client.fetchSmartMoneyActivity();
  } catch (err) {
    source = "fallback";
    error = err instanceof Error ? err.message : "Unknown error";
    console.warn("[clawdbot/market] Nansen fallback:", error);
  }

  return NextResponse.json({
    success: true,
    data: {
      prices: mockMarket.prices,
      smartMoneyActivity: activity,
      marketSummary: mockMarket.marketSummary,
      source,
      error,
    },
  });
}

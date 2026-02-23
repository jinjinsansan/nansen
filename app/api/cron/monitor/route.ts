import { NextResponse } from "next/server";
import { ensureCronAuth } from "@/lib/api/auth";
import { mockWallets, mockMarket } from "@/lib/data/mockData";

export async function POST(request: Request) {
  const unauthorized = ensureCronAuth(request);
  if (unauthorized) return unauthorized;

  const alert = mockMarket.smartMoneyActivity[0];

  return NextResponse.json({
    success: true,
    checked_wallets: mockWallets.length,
    alert,
  });
}

export async function GET(request: Request) {
  return POST(request);
}

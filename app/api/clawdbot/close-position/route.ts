import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureClawdbotAuth } from "@/lib/api/auth";
import { HyperliquidClient } from "@/lib/hyperliquid/client";

const schema = z.object({
  trade_id: z.string(),
  reason: z.string().optional(),
  close_percent: z.number().optional(),
});

export async function POST(request: Request) {
  const unauthorized = ensureClawdbotAuth(request);
  if (unauthorized) return unauthorized;

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const client = new HyperliquidClient();
  const order = await client.closePosition(parsed.data.trade_id);

  return NextResponse.json({ success: true, order });
}

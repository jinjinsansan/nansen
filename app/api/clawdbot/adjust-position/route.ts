import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureClawdbotAuth } from "@/lib/api/auth";
import { HyperliquidClient } from "@/lib/hyperliquid/client";

const schema = z.object({
  trade_id: z.string(),
  action: z.enum(["partial_close", "move_stop_loss"]),
  percent: z.number().optional(),
  new_stop_loss_percent: z.number().optional(),
  reason: z.string().optional(),
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
  const order = await client.adjustPosition({
    tradeId: parsed.data.trade_id,
    action: parsed.data.action,
    percent: parsed.data.percent,
    newStopLossPercent: parsed.data.new_stop_loss_percent,
    reason: parsed.data.reason,
  });

  return NextResponse.json({ success: true, order });
}

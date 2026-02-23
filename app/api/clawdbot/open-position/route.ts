import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureClawdbotAuth } from "@/lib/api/auth";
import { HyperliquidClient } from "@/lib/hyperliquid/client";

const schema = z.object({
  symbol: z.string().min(1),
  side: z.enum(["long", "short"]),
  size_usd: z.number().positive(),
  reason: z.string().optional(),
  stop_loss_percent: z.number().optional(),
  take_profit_percent: z.number().optional(),
  source_wallet: z.string().optional(),
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
  const order = await client.openPosition({
    symbol: parsed.data.symbol,
    side: parsed.data.side,
    sizeUsd: parsed.data.size_usd,
    stopLossPercent: parsed.data.stop_loss_percent,
    takeProfitPercent: parsed.data.take_profit_percent,
    sourceWallet: parsed.data.source_wallet,
    reason: parsed.data.reason,
  });

  return NextResponse.json({
    success: true,
    trade: {
      id: order.orderId,
      symbol: parsed.data.symbol,
      side: parsed.data.side,
      size_usd: parsed.data.size_usd,
      entry_price: order.price,
      stop_loss_price: parsed.data.stop_loss_percent
        ? order.price * (1 - parsed.data.stop_loss_percent / 100)
        : undefined,
      take_profit_price: parsed.data.take_profit_percent
        ? order.price * (1 + parsed.data.take_profit_percent / 100)
        : undefined,
    },
  });
}

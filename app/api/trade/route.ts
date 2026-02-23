import { NextResponse } from "next/server";
import { z } from "zod";
import { HyperliquidClient } from "@/lib/hyperliquid/client";

const schema = z.object({
  symbol: z.string(),
  side: z.enum(["long", "short"]),
  size: z.number().positive(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const client = new HyperliquidClient();
  const order = await client.openPosition({
    symbol: parsed.data.symbol,
    side: parsed.data.side,
    sizeUsd: parsed.data.size,
  });

  return NextResponse.json({ success: true, order });
}

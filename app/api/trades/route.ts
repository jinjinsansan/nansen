import { NextResponse } from "next/server";
import { mockTrades } from "@/lib/data/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = (searchParams.get("status") ?? "all") as "open" | "closed" | "all";
  const limit = Number(searchParams.get("limit") ?? 50);
  const offset = Number(searchParams.get("offset") ?? 0);

  const filtered = mockTrades.filter((trade) =>
    status === "all" ? true : trade.status === status,
  );

  const trades = filtered.slice(offset, offset + limit);

  return NextResponse.json({ trades, total: filtered.length });
}

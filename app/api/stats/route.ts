import { NextResponse } from "next/server";
import { mockBotStatus, mockTrades } from "@/lib/data/mockData";

export async function GET() {
  const winRate = 67.5;
  return NextResponse.json({
    total_pnl: mockBotStatus.totalPnl,
    today_pnl: mockBotStatus.todayPnl,
    win_rate: winRate,
    bot_status: mockBotStatus.botEnabled ? "running" : "stopped",
    open_positions: mockBotStatus.openPositions.length,
    total_trades: mockTrades.length,
  });
}

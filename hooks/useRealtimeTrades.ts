"use client";

import { useEffect, useState } from "react";
import { Trade } from "@/types";
import { mockTrades } from "@/lib/data/mockData";

export function useRealtimeTrades() {
  const [trades, setTrades] = useState<Trade[]>(mockTrades);

  useEffect(() => {
    const id = setInterval(() => {
      setTrades((prev) => {
        // Simulate minor P&L drift for open trades
        return prev.map((trade) => {
          if (trade.status !== "open") return trade;
          const delta = (Math.random() - 0.5) * 5;
          return {
            ...trade,
            pnl: (trade.pnl ?? 0) + delta,
            pnlPercent: (trade.pnlPercent ?? 0) + delta / (trade.entryPrice / 100),
          };
        });
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return trades;
}

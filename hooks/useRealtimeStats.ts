"use client";

import { useEffect, useState } from "react";
import { BotStatus } from "@/types";
import { mockBotStatus } from "@/lib/data/mockData";

export function useRealtimeStats() {
  const [status, setStatus] = useState<BotStatus>(mockBotStatus);

  useEffect(() => {
    const id = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        todayPnl: prev.todayPnl + Math.random() * 5 - 2.5,
      }));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return status;
}

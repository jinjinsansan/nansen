"use client";

import { useState } from "react";
import { Trade } from "@/types";
import { useRealtimeTrades } from "@/hooks/useRealtimeTrades";
import { TradeList } from "@/components/dashboard/TradeList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const statusOptions: (Trade["status"] | "all")[] = ["all", "open", "closed", "error"];

export default function TradesPage() {
  const trades = useRealtimeTrades();
  const [status, setStatus] = useState<(typeof statusOptions)[number]>("all");

  const filtered = trades.filter((trade) => (status === "all" ? true : trade.status === status));

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between px-0">
          <div>
            <CardTitle>取引履歴</CardTitle>
            <CardDescription>ステータスでフィルタできます</CardDescription>
          </div>
          <div className="flex gap-2">
            {statusOptions.map((option) => (
              <Button
                key={option}
                variant={status === option ? "default" : "outline"}
                size="sm"
                onClick={() => setStatus(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <TradeList trades={filtered} title="" showViewAll={false} />
        </CardContent>
      </Card>
    </div>
  );
}

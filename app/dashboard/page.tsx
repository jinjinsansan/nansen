"use client";

import { useMemo } from "react";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { PnlChart } from "@/components/dashboard/PnlChart";
import { TradeList } from "@/components/dashboard/TradeList";
import { WalletList } from "@/components/dashboard/WalletList";
import { BotStatusCard } from "@/components/dashboard/BotStatus";
import { useRealtimeStats } from "@/hooks/useRealtimeStats";
import { useRealtimeTrades } from "@/hooks/useRealtimeTrades";
import { useWallets } from "@/hooks/useWallets";
import { mockDailyPnl, mockMarket } from "@/lib/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const botStatus = useRealtimeStats();
  const trades = useRealtimeTrades();
  const { wallets } = useWallets();

  const winRate = useMemo(() => 67.5, []);
  const totalTrades = useMemo(() => 156, []);

  return (
    <div className="space-y-6">
      <KpiCards botStatus={botStatus} winRate={winRate} totalTrades={totalTrades} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PnlChart data={mockDailyPnl} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} />
        </div>
        <BotStatusCard status={botStatus} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TradeList trades={trades} />
        </div>
        <WalletList wallets={wallets} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>市場とスマートマネー</CardTitle>
          <CardDescription>Clawdbotが参照するマーケットスナップショット</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2 rounded-lg border border-border p-3">
            <p className="text-sm text-muted-foreground">価格</p>
            <div className="flex items-center justify-between text-sm">
              <span>BTC</span>
              <span className="font-semibold">{formatCurrency(mockMarket.prices.BTC)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>ETH</span>
              <span className="font-semibold">{formatCurrency(mockMarket.prices.ETH)}</span>
            </div>
          </div>
          <div className="space-y-2 rounded-lg border border-border p-3">
            <p className="text-sm text-muted-foreground">市場概要</p>
            <div className="flex items-center justify-between text-sm">
              <span>BTC 24h</span>
              <Badge variant="success">+{mockMarket.marketSummary.btc24hChange}%</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>ETH 24h</span>
              <Badge variant="success">+{mockMarket.marketSummary.eth24hChange}%</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Fear & Greed</span>
              <Badge variant="outline">{mockMarket.marketSummary.fearGreedIndex}</Badge>
            </div>
          </div>
          <div className="space-y-2 rounded-lg border border-border p-3">
            <p className="text-sm text-muted-foreground">スマートマネー</p>
            {mockMarket.smartMoneyActivity.map((activity) => (
              <div key={activity.wallet} className="space-y-1 rounded-md border border-border/80 p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{activity.label}</span>
                  <Badge variant={activity.action === "buy" ? "success" : "destructive"}>{activity.action}</Badge>
                </div>
                <p className="text-muted-foreground">{activity.wallet}</p>
                <p className="text-muted-foreground">
                  {activity.symbol} {formatCurrency(activity.sizeUsd)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

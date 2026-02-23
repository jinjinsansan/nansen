"use client";

import { useState } from "react";
import { WatchedWallet } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatPercent } from "@/lib/utils";

interface Props {
  wallets: WatchedWallet[];
  onToggle?: (id: string, active: boolean) => void;
  onDelete?: (id: string) => void;
}

export function WalletList({ wallets, onToggle, onDelete }: Props) {
  const [items, setItems] = useState(wallets);

  const handleToggle = (id: string, active: boolean) => {
    setItems((prev) => prev.map((w) => (w.id === id ? { ...w, isActive: active } : w)));
    onToggle?.(id, active);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((w) => w.id !== id));
    onDelete?.(id);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">監視ウォレット</CardTitle>
          <CardDescription>Smart Moneyの追跡リスト</CardDescription>
        </div>
        <Button variant="outline" size="sm">+ 追加</Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((wallet) => (
          <div key={wallet.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{wallet.label}</span>
                {wallet.nansenTags?.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{wallet.address}</p>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span>勝率 {wallet.winRate ? formatPercent(wallet.winRate) : "-"}</span>
                <span>取引 {wallet.tradeCount ?? 0}</span>
                <span>総P&L ${(wallet.totalPnl ?? 0).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={wallet.isActive}
                onClick={() => handleToggle(wallet.id, !wallet.isActive)}
                aria-label={`toggle-${wallet.label}`}
              />
              <Button variant="ghost" size="sm" onClick={() => handleDelete(wallet.id)}>
                削除
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { DEFAULT_BOT_CONFIG } from "@/lib/utils/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [config, setConfig] = useState(DEFAULT_BOT_CONFIG);

  const handleChange = (path: string, value: string | number | boolean | string[]) => {
    setConfig((prev) => {
      switch (path) {
        case "trading.enabled":
          return { ...prev, trading: { ...prev.trading, enabled: Boolean(value) } };
        case "trading.defaultSizeUsd":
          return { ...prev, trading: { ...prev.trading, defaultSizeUsd: Number(value) } };
        case "trading.maxPositionUsd":
          return { ...prev, trading: { ...prev.trading, maxPositionUsd: Number(value) } };
        case "trading.maxDailyLossUsd":
          return { ...prev, trading: { ...prev.trading, maxDailyLossUsd: Number(value) } };
        case "trading.stopLossPercent":
          return { ...prev, trading: { ...prev.trading, stopLossPercent: Number(value) } };
        case "trading.takeProfitPercent":
          return { ...prev, trading: { ...prev.trading, takeProfitPercent: Number(value) } };
        case "trading.allowedSymbols":
          return { ...prev, trading: { ...prev.trading, allowedSymbols: (value as string[]).filter(Boolean) } };
        case "trading.minSourceTradeUsd":
          return { ...prev, trading: { ...prev.trading, minSourceTradeUsd: Number(value) } };
        case "notifications.enabled":
          return { ...prev, notifications: { ...prev.notifications, enabled: Boolean(value) } };
        case "notifications.discordWebhook":
          return { ...prev, notifications: { ...prev.notifications, discordWebhook: String(value) } };
        case "notifications.telegramBotToken":
          return { ...prev, notifications: { ...prev.notifications, telegramBotToken: String(value) } };
        case "notifications.telegramChatId":
          return { ...prev, notifications: { ...prev.notifications, telegramChatId: String(value) } };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">設定</h1>
        <p className="text-sm text-muted-foreground">取引・通知・APIの設定を更新します（ダミー保存）。</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>💰 取引設定</CardTitle>
          <CardDescription>リスク管理とデフォルトサイズ</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bot-enabled">ボット有効化</Label>
              <Switch
                id="bot-enabled"
                checked={config.trading.enabled}
                onClick={() => handleChange("trading.enabled", !config.trading.enabled)}
              />
            </div>
          </div>
          <div>
            <Label>デフォルト取引サイズ (USD)</Label>
            <Input
              type="number"
              value={config.trading.defaultSizeUsd}
              onChange={(e) => handleChange("trading.defaultSizeUsd", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>最大ポジション (USD)</Label>
            <Input
              type="number"
              value={config.trading.maxPositionUsd}
              onChange={(e) => handleChange("trading.maxPositionUsd", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>1日の最大損失 (USD)</Label>
            <Input
              type="number"
              value={config.trading.maxDailyLossUsd}
              onChange={(e) => handleChange("trading.maxDailyLossUsd", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>ストップロス (%)</Label>
            <Input
              type="number"
              value={config.trading.stopLossPercent}
              onChange={(e) => handleChange("trading.stopLossPercent", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>テイクプロフィット (%)</Label>
            <Input
              type="number"
              value={config.trading.takeProfitPercent}
              onChange={(e) => handleChange("trading.takeProfitPercent", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>対象シンボル（カンマ区切り）</Label>
            <Input
              value={config.trading.allowedSymbols.join(",")}
              onChange={(e) => handleChange("trading.allowedSymbols", e.target.value.split(","))}
            />
          </div>
          <div>
            <Label>最小コピー金額 (USD)</Label>
            <Input
              type="number"
              value={config.trading.minSourceTradeUsd}
              onChange={(e) => handleChange("trading.minSourceTradeUsd", Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔔 通知設定</CardTitle>
          <CardDescription>Discord / Telegram / WhatsApp 連携</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between">
            <Label>通知有効化</Label>
            <Switch
              checked={config.notifications.enabled}
              onClick={() => handleChange("notifications.enabled", !config.notifications.enabled)}
            />
          </div>
          <div>
            <Label>Discord Webhook URL</Label>
            <Input
              value={config.notifications.discordWebhook}
              onChange={(e) => handleChange("notifications.discordWebhook", e.target.value)}
            />
          </div>
          <div>
            <Label>Telegram Bot Token</Label>
            <Input
              value={config.notifications.telegramBotToken}
              onChange={(e) => handleChange("notifications.telegramBotToken", e.target.value)}
            />
          </div>
          <div>
            <Label>Telegram Chat ID</Label>
            <Input
              value={config.notifications.telegramChatId}
              onChange={(e) => handleChange("notifications.telegramChatId", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔑 API設定</CardTitle>
          <CardDescription>Hyperliquid / Nansen / Clawdbot</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div>
              <p className="text-sm font-semibold">Hyperliquid Testnet</p>
              <p className="text-xs text-muted-foreground">環境変数で制御</p>
            </div>
            <Switch checked={process.env.NEXT_PUBLIC_HYPERLIQUID_TESTNET === "true"} disabled />
          </div>
          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div>
              <p className="text-sm font-semibold">Wallet</p>
              <p className="text-xs text-muted-foreground">接続ステータスは実装で更新</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">Connected</span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div>
              <p className="text-sm font-semibold">Nansen API</p>
              <p className="text-xs text-muted-foreground">APIキー設定を確認</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">Connected</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">キャンセル</Button>
        <Button>💾 保存（ダミー）</Button>
      </div>
    </div>
  );
}

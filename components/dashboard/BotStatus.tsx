import { BotStatus } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface Props {
  status: BotStatus;
}

export function BotStatusCard({ status }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ボット稼働状況</CardTitle>
        <CardDescription>Clawdbot連携の現在値</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Badge variant={status.botEnabled ? "success" : "warning"}>
            {status.botEnabled ? "稼働中" : "停止"}
          </Badge>
          <span className="text-muted-foreground">
            日次残り損失: {formatCurrency(status.dailyLossRemaining)} / Max {formatCurrency(status.maxPosition)}
          </span>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground">オープンポジション</p>
          <ul className="mt-2 space-y-2">
            {status.openPositions.map((p) => (
              <li key={p.id} className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{p.symbol}</span>
                  <Badge variant={p.side === "long" ? "success" : "destructive"}>{p.side}</Badge>
                  <span className="text-muted-foreground">{formatCurrency(p.size)}</span>
                </div>
                <div className={p.pnl && p.pnl > 0 ? "text-emerald-600" : "text-destructive"}>
                  {formatCurrency(p.pnl ?? 0)} ({p.pnlPercent?.toFixed(2)}%)
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="rounded-md border border-border p-2">
            <p className="text-muted-foreground">総P&L</p>
            <p className="text-base font-semibold text-foreground">{formatCurrency(status.totalPnl)}</p>
          </div>
          <div className="rounded-md border border-border p-2">
            <p className="text-muted-foreground">利用可能残高</p>
            <p className="text-base font-semibold text-foreground">{formatCurrency(status.availableBalance)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

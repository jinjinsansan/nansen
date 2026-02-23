import { BotStatus } from "@/types";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props {
  botStatus: BotStatus;
  winRate: number;
  totalTrades: number;
}

export function KpiCards({ botStatus, winRate, totalTrades }: Props) {
  const cards = [
    {
      title: "総損益",
      value: formatCurrency(botStatus.totalPnl),
      description: "累計P&L",
    },
    {
      title: "今日のP&L",
      value: formatCurrency(botStatus.todayPnl),
      description: "本日実績",
    },
    {
      title: "勝率",
      value: formatPercent(winRate),
      description: `${totalTrades} trades`,
    },
    {
      title: "ボット状況",
      value: (
        <div className="flex items-center gap-2">
          <Badge variant={botStatus.botEnabled ? "success" : "warning"}>
            {botStatus.botEnabled ? "稼働中" : "停止"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Open {botStatus.openPositions.length} / Max ${formatNumber(botStatus.maxPosition)}
          </span>
        </div>
      ),
      description: `残り日次損失: ${formatCurrency(botStatus.dailyLossRemaining)}`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-4">
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="mt-2 text-2xl font-semibold">{card.value}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

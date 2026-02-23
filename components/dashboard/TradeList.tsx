import Link from "next/link";
import { Trade } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";

interface Props {
  trades: Trade[];
  title?: string;
  showViewAll?: boolean;
}

export function TradeList({ trades, title = "最新取引", showViewAll = true }: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>リアルタイム更新予定</CardDescription>
        </div>
        {showViewAll && (
          <Link href="/trades" className="text-sm text-primary hover:underline">
            すべて表示
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <Thead>
            <Tr>
              <Th>シンボル</Th>
              <Th>サイズ</Th>
              <Th>損益</Th>
              <Th>状態</Th>
              <Th>ソース</Th>
              <Th>時間</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trades.map((trade) => (
              <Tr key={trade.id}>
                <Td className="font-semibold">{trade.symbol}</Td>
                <Td>
                  {trade.side === "long" ? "🟢" : "🔴"} {formatCurrency(trade.size)} @ {formatCurrency(trade.entryPrice)}
                </Td>
                <Td>
                  <span className={trade.pnl && trade.pnl >= 0 ? "text-emerald-600" : "text-destructive"}>
                    {formatCurrency(trade.pnl ?? 0)} ({formatPercent(trade.pnlPercent ?? 0)})
                  </span>
                </Td>
                <Td>
                  <Badge variant={trade.status === "open" ? "success" : trade.status === "error" ? "destructive" : "default"}>
                    {trade.status}
                  </Badge>
                </Td>
                <Td className="text-xs text-muted-foreground">{trade.sourceWallet ?? "-"}</Td>
                <Td className="text-xs text-muted-foreground">{formatDate(trade.openedAt)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardContent>
    </Card>
  );
}

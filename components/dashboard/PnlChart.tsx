import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface Props {
  data: number[];
  labels?: string[];
}

export function PnlChart({ data, labels = [] }: Props) {
  const max = Math.max(...data, 0);
  const min = Math.min(...data, 0);
  const normalized = data.map((value) => (value - min) / (max - min || 1));
  const points = normalized
    .map((n, i) => `${(i / Math.max(data.length - 1, 1)) * 100},${100 - n * 100}`)
    .join(" ");

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>損益推移（過去7日）</CardTitle>
        <CardDescription>日次P&Lを簡易チャートで表示</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full">
          <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              points={points}
            />
            {normalized.map((n, i) => (
              <circle
                key={i}
                cx={(i / Math.max(data.length - 1, 1)) * 100}
                cy={100 - n * 100}
                r={1.5}
                fill="hsl(var(--primary))"
              />
            ))}
          </svg>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {data.map((value, index) => (
            <span key={index} className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {labels[index] ?? `Day ${index + 1}`}: {formatCurrency(value)}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

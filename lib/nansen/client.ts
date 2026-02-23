import { NansenClientOptions, NansenSmartMoneyActivity } from "./types";

export class NansenClient {
  private readonly apiKey?: string;
  private readonly baseUrl: string;

  constructor(options: NansenClientOptions = {}) {
    this.apiKey = options.apiKey ?? process.env.NANSEN_API_KEY;
    this.baseUrl = options.baseUrl ?? process.env.NANSEN_API_URL ?? "https://api.nansen.ai";
  }

  private get headers() {
    if (!this.apiKey) {
      throw new Error("NANSEN_API_KEY is missing");
    }
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    } satisfies Record<string, string>;
  }

  private async request<T>(path: string, search?: Record<string, string | number | undefined>): Promise<T> {
    const url = new URL(path, this.baseUrl);
    if (search) {
      Object.entries(search)
        .filter(([, value]) => value !== undefined)
        .forEach(([key, value]) => url.searchParams.set(key, String(value)));
    }

    const res = await fetch(url.toString(), {
      headers: this.headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Nansen API ${res.status}: ${text}`);
    }

    return res.json();
  }

  /**
   * Fetch recent smart money activity.
   * Endpoint path may vary by plan; adjust as needed.
   */
  async fetchSmartMoneyActivity(): Promise<NansenSmartMoneyActivity[]> {
    // Example endpoint; replace with the correct one for your plan
    type ApiItem = {
      address?: string;
      wallet?: string;
      label?: string;
      side?: string;
      action?: string;
      symbol?: string;
      usd_notional?: number;
      size_usd?: number;
      timestamp?: string;
      win_rate?: number;
      total_pnl?: number;
    };

    const data = await this.request<{ items?: ApiItem[] }>("/v1/smart-money/activity");
    const items = data.items ?? [];

    return items.map((item) => {
      const action = (item.action ?? item.side ?? "buy").toLowerCase() === "sell" ? "sell" : "buy";
      return {
        wallet: item.wallet ?? item.address ?? "unknown",
        label: item.label ?? "Smart Money",
        action,
        symbol: item.symbol ?? "BTC",
        sizeUsd: item.size_usd ?? item.usd_notional ?? 0,
        timestamp: item.timestamp ?? new Date().toISOString(),
        winRate: item.win_rate,
        totalPnl: item.total_pnl,
      } satisfies NansenSmartMoneyActivity;
    });
  }
}

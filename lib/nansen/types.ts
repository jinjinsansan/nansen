export interface NansenSmartMoneyActivity {
  wallet: string;
  label: string;
  action: "buy" | "sell";
  symbol: string;
  sizeUsd: number;
  timestamp: string;
  winRate?: number;
  totalPnl?: number;
}

export interface NansenClientOptions {
  apiKey?: string;
  baseUrl?: string;
}

import { NansenClientOptions, NansenSmartMoneyActivity } from "./types";

export class NansenClient {
  private readonly apiKey?: string;
  private readonly baseUrl: string;

  constructor(options: NansenClientOptions = {}) {
    this.apiKey = options.apiKey ?? process.env.NANSEN_API_KEY;
    this.baseUrl = options.baseUrl ?? process.env.NANSEN_API_URL ?? "https://api.nansen.ai";
  }

  async fetchSmartMoneyActivity(): Promise<NansenSmartMoneyActivity[]> {
    // Placeholder: in a real implementation this would call the Nansen API
    return [
      {
        wallet: "0x1234...abcd",
        label: "Smart Money #1",
        action: "buy",
        symbol: "BTC",
        sizeUsd: 50000,
        timestamp: new Date().toISOString(),
        winRate: 72,
        totalPnl: 125000,
      },
    ];
  }
}

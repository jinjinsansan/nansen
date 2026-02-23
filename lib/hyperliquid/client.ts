import { AdjustPositionInput, HyperliquidOrderResult, OpenPositionInput } from "./types";

export class HyperliquidClient {
  private readonly privateKey?: string;
  private readonly walletAddress?: string;
  private readonly testnet: boolean;

  constructor() {
    this.privateKey = process.env.HYPERLIQUID_PRIVATE_KEY;
    this.walletAddress = process.env.HYPERLIQUID_WALLET_ADDRESS;
    this.testnet = process.env.HYPERLIQUID_TESTNET === "true";
  }

  async openPosition(input: OpenPositionInput): Promise<HyperliquidOrderResult> {
    // Placeholder for SDK interaction
    return {
      orderId: `${input.symbol}-${Date.now()}`,
      price: this.getMockPrice(input.symbol),
    };
  }

  async closePosition(tradeId: string): Promise<HyperliquidOrderResult> {
    return {
      orderId: `${tradeId}-close`,
      price: this.getMockPrice("BTC"),
    };
  }

  async adjustPosition(input: AdjustPositionInput): Promise<HyperliquidOrderResult> {
    return {
      orderId: `adjust-${input.tradeId}-${Date.now()}`,
      price: this.getMockPrice("BTC"),
    };
  }

  private getMockPrice(symbol: string) {
    const base = symbol === "ETH" ? 2800 : 95000;
    return base + Math.random() * 500;
  }
}

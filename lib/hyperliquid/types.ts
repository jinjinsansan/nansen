export interface OpenPositionInput {
  symbol: string;
  side: "long" | "short";
  sizeUsd: number;
  stopLossPercent?: number;
  takeProfitPercent?: number;
  sourceWallet?: string;
  reason?: string;
}

export interface AdjustPositionInput {
  tradeId: string;
  action: "partial_close" | "move_stop_loss";
  percent?: number;
  newStopLossPercent?: number;
  reason?: string;
}

export interface HyperliquidOrderResult {
  orderId: string;
  price: number;
}

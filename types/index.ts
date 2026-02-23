export type TradeSide = "long" | "short";
export type TradeStatus = "open" | "closed" | "error";

export interface Trade {
  id: string;
  symbol: string;
  side: TradeSide;
  size: number;
  entryPrice: number;
  exitPrice?: number;
  pnl?: number;
  pnlPercent?: number;
  status: TradeStatus;
  sourceWallet?: string;
  sourceTxHash?: string;
  reason?: string;
  hyperliquidOrderId?: string;
  openedAt: string;
  closedAt?: string;
}

export interface WatchedWallet {
  id: string;
  address: string;
  label: string;
  source?: "manual" | "nansen";
  nansenTags?: string[];
  isActive: boolean;
  winRate?: number;
  totalPnl?: number;
  tradeCount?: number;
  lastTradeAt?: string;
}

export interface BotStatus {
  botEnabled: boolean;
  openPositions: Trade[];
  totalPnl: number;
  todayPnl: number;
  availableBalance: number;
  maxPosition: number;
  dailyLossRemaining: number;
}

export interface MarketActivity {
  wallet: string;
  label: string;
  action: "buy" | "sell";
  symbol: string;
  sizeUsd: number;
  timestamp: string;
  walletStats?: {
    winRate?: number;
    totalPnl?: number;
  };
}

export interface MarketSummary {
  btc24hChange: number;
  eth24hChange: number;
  fearGreedIndex: number;
}

export interface MarketResponse {
  prices: Record<string, number>;
  smartMoneyActivity: MarketActivity[];
  marketSummary: MarketSummary;
}

export interface BotConfigTrading {
  enabled: boolean;
  maxPositionUsd: number;
  defaultSizeUsd: number;
  maxDailyLossUsd: number;
  stopLossPercent: number;
  takeProfitPercent: number;
  allowedSymbols: string[];
  minSourceTradeUsd: number;
}

export interface BotConfigNotifications {
  enabled: boolean;
  discordWebhook?: string;
  telegramBotToken?: string;
  telegramChatId?: string;
}

export interface BotConfig {
  trading: BotConfigTrading;
  notifications: BotConfigNotifications;
}

export interface ActivityLog {
  id: string;
  type: "trade" | "error" | "config" | "wallet";
  level: "info" | "warn" | "error";
  message: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ClawdbotEvent<T = Record<string, unknown>> {
  event: string;
  data: T;
  priority?: "low" | "normal" | "high";
}

export interface SmartMoneyAlertData {
  wallet: string;
  label: string;
  action: "buy" | "sell";
  symbol: string;
  sizeUsd: number;
  timestamp: string;
}

export interface PositionUpdateData {
  tradeId: string;
  symbol: string;
  unrealizedPnl: number;
  pnlPercent: number;
}

export interface StopLossTriggeredData {
  tradeId: string;
  symbol: string;
  loss: number;
}

export type InternalEventData =
  | SmartMoneyAlertData
  | PositionUpdateData
  | StopLossTriggeredData;

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

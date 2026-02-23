import { BotStatus, MarketResponse, Trade, WatchedWallet } from "@/types";

export const mockTrades: Trade[] = [
  {
    id: "t1",
    symbol: "BTC",
    side: "long",
    size: 100,
    entryPrice: 95000,
    exitPrice: undefined,
    pnl: 45.23,
    pnlPercent: 4.5,
    status: "open",
    sourceWallet: "0x1234...abcd",
    reason: "Smart Money 72% win rate",
    openedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: "t2",
    symbol: "ETH",
    side: "short",
    size: 100,
    entryPrice: 2800,
    exitPrice: 2760,
    pnl: -12.5,
    pnlPercent: -3.1,
    status: "closed",
    sourceWallet: "0x5678...efgh",
    openedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    closedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "t3",
    symbol: "BTC",
    side: "long",
    size: 100,
    entryPrice: 94500,
    exitPrice: 96100,
    pnl: 23.1,
    pnlPercent: 2.45,
    status: "closed",
    sourceWallet: "0x9abc...ijkl",
    openedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    closedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
  },
];

export const mockWallets: WatchedWallet[] = [
  {
    id: "w1",
    address: "0x1234...abcd",
    label: "smartmoney1",
    isActive: true,
    winRate: 72,
    totalPnl: 125000,
    tradeCount: 154,
    lastTradeAt: new Date().toISOString(),
    nansenTags: ["Smart Money"],
  },
  {
    id: "w2",
    address: "0x5678...efgh",
    label: "whale_trader",
    isActive: true,
    winRate: 65,
    totalPnl: 85000,
    tradeCount: 210,
    lastTradeAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    nansenTags: ["Fund"],
  },
  {
    id: "w3",
    address: "0x9abc...ijkl",
    label: "degen_alpha",
    isActive: false,
    winRate: 58,
    totalPnl: 15000,
    tradeCount: 95,
    lastTradeAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
];

export const mockBotStatus: BotStatus = {
  botEnabled: true,
  openPositions: mockTrades.filter((t) => t.status === "open"),
  totalPnl: 1234.56,
  todayPnl: 89.12,
  availableBalance: 400,
  maxPosition: 500,
  dailyLossRemaining: 150,
};

export const mockMarket: MarketResponse = {
  prices: {
    BTC: 95500,
    ETH: 2850,
  },
  smartMoneyActivity: [
    {
      wallet: "0x1234...abcd",
      label: "Smart Money #1",
      action: "buy",
      symbol: "BTC",
      sizeUsd: 50000,
      timestamp: new Date().toISOString(),
      walletStats: {
        winRate: 72,
        totalPnl: 125000,
      },
    },
  ],
  marketSummary: {
    btc24hChange: 2.5,
    eth24hChange: 1.8,
    fearGreedIndex: 65,
  },
};

export const mockDailyPnl = [200, 120, 180, -40, 300, 150, 220];

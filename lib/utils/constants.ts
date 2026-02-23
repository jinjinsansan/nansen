import { BotConfig } from "@/types";

export const DEFAULT_BOT_CONFIG: BotConfig = {
  trading: {
    enabled: true,
    maxPositionUsd: 500,
    defaultSizeUsd: 100,
    maxDailyLossUsd: 200,
    stopLossPercent: 5,
    takeProfitPercent: 10,
    allowedSymbols: ["BTC", "ETH"],
    minSourceTradeUsd: 10000,
  },
  notifications: {
    enabled: true,
    discordWebhook: "",
    telegramBotToken: "",
    telegramChatId: "",
  },
};

export const APP_NAME = "AI Trading Bot";
export const CLAWDBOT_HEADER = "clawdbot";

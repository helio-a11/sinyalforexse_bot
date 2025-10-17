import { analyzePair } from "./analyzer.js";

export function scheduleAutoAnalysis(bot, intervalMinutes) {
  const pairs = ["EURUSD", "USDJPY", "GBPUSD"];
  setInterval(async () => {
    for (const p of pairs) {
      const signal = await analyzePair(p, "15m");
      bot.sendMessage(process.env.TELEGRAM_GROUP_ID || "<YOUR_CHAT_ID>", `⏰ [AUTO] ${p}: ${signal}`);
    }
  }, intervalMinutes * 60 * 1000);
}

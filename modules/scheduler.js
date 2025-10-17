import { analyzePair } from "./analyzer.js";

export function scheduleAutoAnalysis(bot, intervalMinutes) {
  const pairs = ["EURUSD", "USDJPY", "GBPUSD"];

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    setInterval(async () => {
      for (const p of pairs) {
        const signal = await analyzePair(p, "15m");
        bot.sendMessage(chatId, `⏰ [AUTO] ${p}: ${signal}`);
      }
    }, intervalMinutes * 60 * 1000);
  });
}
import TelegramBot from "node-telegram-bot-api";
import { analyzePair } from "./modules/analyzer.js";
import { analyzeImage } from "./modules/imageAnalyzer.js";
import { scheduleAutoAnalysis } from "./modules/scheduler.js";
import dotenv from "dotenv";
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/signal (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [pair, tf] = match[1].split(" ");
  const signal = await analyzePair(pair, tf || "15m");
  bot.sendMessage(chatId, `📊 Sinyal ${pair} (${tf}): ${signal}`);
});

bot.on("photo", async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "🖼️ Menganalisis chart...");
  const res = await analyzeImage();
  bot.sendMessage(chatId, `📈 Hasil analisis gambar: ${res}`);
});

scheduleAutoAnalysis(bot, 5);
console.log("🤖 Bot sinyalforexse_bot aktif...");

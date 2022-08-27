const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();

const {TOKEN: token} = process.env;
const bot = new TelegramBot(token, {polling: true});

bot.on("message", (message)=> {
  const chatId = message.chat.id;
  bot.sendMessage(chatId,"Вижу вас как наяву! Чем займёмся?");
})

const { Telegraf, Markup } = require('telegraf');
const dotenv = require('dotenv');
dotenv.config();

const {TOKEN: token} = process.env;

const bot = new Telegraf(token);

bot.start((ctx) => {
  console.log(ctx.update.message.from);
  ctx.reply('hi');
})

bot.launch();

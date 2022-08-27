const { Telegraf, Markup } = require('telegraf');
const {MONGODB_URI, TOKEN} = require("./src/config");
const mongoose = require('mongoose');
const Measurement = require('./src/models/measurements');

const bot = new Telegraf(TOKEN);

mongoose.connect(MONGODB_URI)

bot.start((ctx) => {
  ctx.reply('hi');
});

bot.command('me', async (ctx) => {
  const measurement = new Measurement({
    date: new Date(),
    plasma: 5.5,
    blood: 5.5,
  });
  await measurement.save();
})

bot.launch();

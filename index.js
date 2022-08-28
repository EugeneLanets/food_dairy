import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';
import start from './src/controllers/start.js';
import { MONGODB_URI, TOKEN } from './src/config.js';

// const Measurement = require('./src/models/measurements');

const bot = new Telegraf(TOKEN);

mongoose.connect(MONGODB_URI);

const stage = new Scenes.Stage([start]);
bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.scene.enter('start');
});

bot.launch();

import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';
import start from './src/controllers/start.js';
import mainScene from './src/controllers/main/index.js';
import { MONGODB_URI, TOKEN } from './src/config.js';
import measurement from './src/controllers/measurement.js';

const bot = new Telegraf(TOKEN);

mongoose.connect(MONGODB_URI);

const stage = new Scenes.Stage([start, mainScene, measurement]);
bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.scene.enter('start');
});

bot.launch();

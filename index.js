import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';
import start from './src/controllers/start.js';
import main from './src/controllers/main.js';
import { MONGODB_URI, TOKEN } from './src/config.js';
import measurement from './src/controllers/measurement.js';

// const Measurement = require('./src/models/measurements');

const bot = new Telegraf(TOKEN);

mongoose.connect(MONGODB_URI);

const stage = new Scenes.Stage([start, main, measurement]);
bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.scene.enter('start');
});

bot.launch();

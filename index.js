import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';
import start from './src/controllers/start.js';
import mainScene from './src/controllers/main/index.js';
import foodScene from './src/controllers/food/index.js';
import { MONGODB_URI, TOKEN } from './src/config.js';
import measurement from './src/controllers/measurement.js';

const bot = new Telegraf(TOKEN);

mongoose.connect(MONGODB_URI);

const scenesList = [
  start,
  mainScene,
  measurement,
  foodScene,
];

const stage = new Scenes.Stage(scenesList);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.scene.enter('start');
});

bot.launch();

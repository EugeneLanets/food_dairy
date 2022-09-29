import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';

import { MONGODB_URI, TOKEN } from './src/config.js';
import scenesList from './src/scenes/scenesList.js';

const bot = new Telegraf(TOKEN);

mongoose.connect(MONGODB_URI);

const stage = new Scenes.Stage(scenesList);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.scene.enter('start');
});

bot.launch();

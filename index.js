import mongoose from 'mongoose';
import { MONGODB_URI } from './src/config.js';
import bot from './src/bot/bot.js';

mongoose.connect(MONGODB_URI);

bot.launch();

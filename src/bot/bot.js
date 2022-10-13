import { Scenes, session, Telegraf } from 'telegraf';
import { TOKEN } from '../config.js';
import scenesList from '../scenes/scenesList.js';
import actions from './actions.js';

const bot = new Telegraf(TOKEN);
const stage = new Scenes.Stage(scenesList);

bot.use(session());
bot.use(stage.middleware());

bot.start(actions.onStart);

bot.command('meas', actions.onMeasurementsSave);
bot.command('get', actions.onMeasurementsGet);

export default bot;

import { Scenes } from 'telegraf';
import actions from './actions.js';

const period = new Scenes.BaseScene('period');

period.enter(actions.onEnter);

export default period;

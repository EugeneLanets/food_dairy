import { Scenes } from 'telegraf';
import actions from './actions.js';

const food = new Scenes.BaseScene('food');

food.enter(actions.onEnter);

food.action(
  /[A-Z]*_ACTION/,
  actions.onMealAction,
);

food.on('text', actions.onMealDescription);

export default food;

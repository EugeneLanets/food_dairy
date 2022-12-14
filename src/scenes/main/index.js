import { Scenes } from 'telegraf';
import actions from './actions.js';

const main = new Scenes.BaseScene('main');

main.enter(actions.onEnter);

main.action('SET_DATE', actions.onSetDate);

main.hears(/[0-3][0-9]-[0|1][0-9]-202[0-9]/, actions.onDateTyped);

main.action('MEASUREMENTS_ACTION', actions.onMeasurementsAction);

main.action('FOOD_ACTION', actions.onFoodAction);

export default main;

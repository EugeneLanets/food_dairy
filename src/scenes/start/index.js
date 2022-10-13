import { Scenes } from 'telegraf';
import actions from './actions.js';

const start = new Scenes.BaseScene('start');

start.enter(actions.onEnter);
start.action('SET_ACTION', actions.onSetAction);
start.action('GET_ACTION', actions.onGetAction);

export default start;

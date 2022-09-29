import { Scenes } from 'telegraf';

import actions from './actions.js';

const measurements = new Scenes.BaseScene('measurements');

measurements.enter(actions.onEnter);

measurements.action(
  /[A-Z]*_ACTION/,
  actions.onMealAction,
);

measurements.action(
  /[A-Z]*_EAT/,
  actions.onTypeAction,
);

measurements.hears(
  /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/,
  actions.onValueInput,
);

export default measurements;

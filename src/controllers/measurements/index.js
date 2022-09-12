import { Markup, Scenes } from 'telegraf';
import Measurement from '../../models/measurements.js';

import utils from './utils.js';

const measurements = new Scenes.BaseScene('measurements');

const mealKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Завтрак', 'BREAKFAST_ACTION'),
  Markup.button.callback('Обед', 'LUNCH_ACTION'),
  Markup.button.callback('Ужин', 'DINNER_ACTION'),
]);

const typeKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('До еды', 'BEFORE_EAT'),
  Markup.button.callback('После еды', 'AFTER_EAT'),
]);

measurements.enter(async (ctx) => {
  ctx.reply(
    'Выберите приём пищи',
    mealKeyboard,
  );
});

measurements.action(
  /[A-Z]*_ACTION/,
  async (ctx) => {
    const { match: { input }, session: { state } } = ctx;
    const meal = utils.getActionType(input);
    state.meal = meal;
    await ctx.answerCbQuery('Приём пищи сохранён');
    await ctx.editMessageText('Выберите тип замера', typeKeyboard);
  },
);

measurements.action(
  /[A-Z]*_EAT/,
  async (ctx) => {
    const { match: { input }, session: { state } } = ctx;
    const type = utils.getActionType(input);
    state.type = type;
    await ctx.answerCbQuery('Тип измерения сохранён');
    await ctx.editMessageText('Введите значение измерения');
  },
);

measurements.hears(
  /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/,
  async (ctx) => {
    const {
      from: { id },
      match: { input: plasma },
      session: {
        state: {
          userDate, meal, type,
        },
      },
    } = ctx;
    const newMeasurement = new Measurement({
      date: userDate || new Date(),
      plasma,
      blood: utils.convertPlasmaToBlood(plasma),
      meal,
      type,
      user: id,
    });

    try {
      await newMeasurement.save(newMeasurement);
    } catch (err) {
      console.log('Something wrong', err);
    }
  },
);

export default measurements;

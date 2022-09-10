import { Scenes } from 'telegraf';
import { getMainKeyboard } from './helpers.js';

const main = new Scenes.BaseScene('main');

main.enter(async (ctx) => {
  ctx.session.currentMeasurement = {};
  const keyboard = getMainKeyboard(Boolean(ctx.session.currentMeasurement?.userDate));
  ctx.reply('Чем займёмся?', keyboard);
});

main.action('SET_DATE', (ctx) => {
  const { userDate = false } = ctx.session.currentMeasurement;
  if (userDate) {
    ctx.session.currentMeasurement = {};
    const keyboard = getMainKeyboard(false);
    ctx.reply('Чем займёмся?', keyboard);
  } else {
    ctx.reply('Введите дату в формате дд-мм-гггг');
  }
});

main.hears(/[0-3][0-9]-[0|1][0-9]-202[0-9]/, (ctx) => {
  const userDate = new Date(ctx.match.input.split('-').reverse().join('-'));
  ctx.session.currentMeasurement.userDate = userDate;

  const keyboard = getMainKeyboard(true);
  ctx.reply('Чем займёмся?', keyboard);
});

main.action('MEASUREMENT_ACTION', (ctx) => {
  ctx.scene.enter('measurement');
});

main.action('FOOD_ACTION', (ctx) => {
  ctx.reply('Вношу еду');
});

export default main;

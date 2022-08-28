import { Markup, Scenes } from 'telegraf';

const main = new Scenes.BaseScene('main');

main.enter(async (ctx) => {
  ctx.reply('Чем займёмся?', Markup.inlineKeyboard([
    Markup.button.callback('Внести измерение', 'MEASUREMENT_ACTION'),
    Markup.button.callback('Внести приём пищи', 'FOOD_ACTION'),
  ]));
});

main.action('MEASUREMENT_ACTION', (ctx) => {
  ctx.scene.enter('measurement');
});

main.action('FOOD_ACTION', (ctx) => {
  ctx.reply('Вношу еду');
});

export default main;

import { Scenes } from 'telegraf';

const food = new Scenes.BaseScene('food');

food.enter((ctx) => {
  ctx.reply('Food');
});

export default food;

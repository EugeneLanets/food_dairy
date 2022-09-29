import { Scenes } from 'telegraf';
import actions from './actions.js';
import Food from '../../models/food.js';
import utils from '../../utils/utils.js';

const food = new Scenes.BaseScene('food');

food.enter(actions.onEnter);

food.action(
  /[A-Z]*_ACTION/,
  actions.onMealAction,
);

food.action('DESCRIPTION', (ctx) => {
  ctx.editMessageText('Введите описание блюда');
});
food.on('text', async (ctx) => {
  const {
    from: { id },
    session: { state },
    message: { text },
  } = ctx;

  state.description = text;

  const newMeal = new Food({
    date: state.userDate || new Date(),
    user: id,
    description: state.description,
  });
  try {
    await newMeal.save();
    await ctx.reply('Данные успешно сохранены');
    ctx.session.state = utils.getSessionState(ctx.session);
    await ctx.scene.enter('main');
  } catch (err) {
    console.log('Something went wrong', err);
  }
});

export default food;

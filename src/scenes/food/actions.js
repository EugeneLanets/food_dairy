import utils from '../../utils/index.js';
import Food from '../../models/food.js';

const onEnter = (ctx) => {
  const keyboard = utils.getKeyboard('foodTime', ctx);
  ctx.editMessageText('Выберите приём пищи', keyboard);
};

const onMealAction = async (ctx) => {
  const { match: { input } } = ctx;
  const meal = utils.getActionType(input);

  utils.setFoodTime(ctx, meal);

  await ctx.answerCbQuery('Время приёма пищи сохранено');
  await ctx.editMessageText(
    'Ввести описание блюда',
  );
};

const onMealDescription = async (ctx) => {
  const {
    message: { text },
  } = ctx;
  utils.setFoodDescription(ctx, text);
  const state = utils.getState(ctx);
  const { uid, userDate, foodDescription } = state;

  const newMeal = new Food({
    date: userDate || utils.getToday(new Date()),
    user: uid,
    description: foodDescription,
  });
  try {
    await newMeal.save();
    await ctx.reply('Данные успешно сохранены');
    utils.initState(ctx);
    await ctx.scene.enter('start');
  } catch (err) {
    console.log('Something went wrong', err);
  }
};

export default {
  onEnter,
  onMealAction,
  onMealDescription,
};

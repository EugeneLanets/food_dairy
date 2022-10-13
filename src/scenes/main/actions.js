import utils from '../../utils/index.js';

const onEnter = async (ctx) => {
  const keyboard = utils.getKeyboard('main', ctx);
  ctx.reply('Что вносим?', keyboard);
};

const onSetDate = async (ctx) => {
  const state = utils.getState(ctx);
  const { userDate } = state;
  if (!userDate) {
    ctx.editMessageText('Введите дату в формате дд-мм-гггг');
  } else {
    const { text } = ctx.update.callback_query.message;
    utils.setUserDate(ctx);
    await ctx.answerCbQuery('Пользовательская дата успешно сброшена');
    const keyboard = utils.getKeyboard('main', ctx);
    await ctx.editMessageText(text, keyboard);
  }
};

const onDateTyped = async (ctx) => {
  const { match: { input } } = ctx;
  const userDate = utils.getUserDate(input);

  utils.setUserDate(ctx, userDate);

  await ctx.reply('Дата успешно установлена');
  await ctx.scene.enter('main');
};

const onMeasurementsAction = async (ctx) => {
  await ctx.scene.enter('measurements');
};

const onFoodAction = async (ctx) => {
  await ctx.scene.enter('food');
};

export default {
  onDateTyped,
  onEnter,
  onFoodAction,
  onMeasurementsAction,
  onSetDate,
};

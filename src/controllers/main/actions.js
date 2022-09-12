import utils from './utils.js';

const onEnter = async (ctx) => {
  const { session } = ctx;
  session.state = utils.getSessionState(session);
  const { userDate } = session.state;

  const keyboard = utils.getMainKeyboard(
    Boolean(userDate),
  );
  ctx.reply('Чем займёмся?', keyboard);
};

const onSetDate = async (ctx) => {
  const { session } = ctx;
  const { userDate } = session.state;
  if (!userDate) {
    ctx.reply('Введите дату в формате дд-мм-гггг');
  } else {
    session.state = utils.getSessionState(session, 'RESET');
    const { text } = ctx.update.callback_query.message;
    const keyboard = utils.getMainKeyboard();
    await ctx.editMessageText(text, keyboard);
    await ctx.answerCbQuery('Пользовательсякая дата успешно сброшена');
  }
};

const onDateTyped = async (ctx) => {
  const { match: { input }, session: { state }, scene } = ctx;
  const userDate = new Date(input.split('-').reverse().join('-'));

  state.userDate = userDate;
  await ctx.reply('Дата успешно установлена');
  await scene.enter('main');
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

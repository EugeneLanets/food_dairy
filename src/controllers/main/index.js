import { Scenes } from 'telegraf';
import { getSessionState, getMainKeyboard } from './helpers.js';

const main = new Scenes.BaseScene('main');

main.enter(async (ctx) => {
  const { session } = ctx;
  session.state = getSessionState(session);
  const { userDate } = session.state;

  console.log(session.state);

  const keyboard = getMainKeyboard(
    Boolean(userDate),
  );
  ctx.reply('Чем займёмся?', keyboard);
});

main.action('SET_DATE', async (ctx) => {
  const { session } = ctx;
  const { userDate } = session.state;
  if (!userDate) {
    ctx.reply('Введите дату в формате дд-мм-гггг');
  } else {
    session.state = getSessionState(session, 'RESET');
    const { text } = ctx.update.callback_query.message;
    const keyboard = getMainKeyboard(false);
    ctx.editMessageText(text, keyboard);
  }
});
//
main.hears(/[0-3][0-9]-[0|1][0-9]-202[0-9]/, async (ctx) => {
  const { match: { input }, session: { state }, scene } = ctx;
  const userDate = new Date(input.split('-').reverse().join('-'));

  state.userDate = userDate;
  await scene.enter('main');
});
//
// main.action('MEASUREMENT_ACTION', (ctx) => {
//   ctx.scene.enter('measurement');
// });
//
// main.action('FOOD_ACTION', (ctx) => {
//   ctx.reply('Вношу еду');
// });

export default main;

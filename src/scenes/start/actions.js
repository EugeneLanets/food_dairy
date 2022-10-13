import User from '../../models/user.js';
import utils from '../../utils/index.js';

const onEnter = async (ctx) => {
  utils.initState(ctx);
  const state = utils.getState(ctx);
  const { uid, firstName } = state;

  const user = await User.findById(uid);

  if (user) {
    const keyboard = utils.getKeyboard('start', ctx);
    await ctx.reply(`С возвращением, ${firstName}`);
    await ctx.reply('Вводим новые данные или забираем существующие?', keyboard);
  } else {
    await ctx.reply(
      `Здравствуйте, ${firstName}!\nК сожалению, регистрация новых пользователей временно закрыта`,
    );
  }
};

const onSetAction = async (ctx) => {
  await ctx.scene.enter('main');
};

const onGetAction = async (ctx) => {
  await ctx.scene.enter('period');
};

export default {
  onEnter,
  onSetAction,
  onGetAction,
};

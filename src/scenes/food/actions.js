import sceneUtils from './utils.js';
import utils from '../../utils/utils.js';

const onEnter = (ctx) => {
  const keyboard = sceneUtils.getKeyboard('meal');
  ctx.editMessageText('Выберите приём пищи', keyboard);
};

const onMealAction = async (ctx) => {
  const { match: { input }, session: { state } } = ctx;
  const meal = utils.getActionType(input);

  state.meal = meal;

  await ctx.answerCbQuery('Приём пищи сохранён');
  await ctx.editMessageText(
    'Ввести описание блюда',
  );
};

export default {
  onEnter,
  onMealAction,
};

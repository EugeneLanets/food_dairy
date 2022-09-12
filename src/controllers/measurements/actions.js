import sceneUtils from './utils.js';
import Measurement from '../../models/measurements.js';
import utils from '../../utils/utils.js';

const onEnter = async (ctx) => {
  const keyboard = sceneUtils.getKeyboard('meal');
  ctx.reply(
    'Выберите приём пищи',
    keyboard,
  );
};

const onMealAction = async (ctx) => {
  const { match: { input }, session: { state } } = ctx;
  const meal = sceneUtils.getActionType(input);

  state.meal = meal;

  await ctx.answerCbQuery('Приём пищи сохранён');

  const keyboard = sceneUtils.getKeyboard('type');
  await ctx.editMessageText('Выберите тип замера', keyboard);
};

const onTypeAction = async (ctx) => {
  const { match: { input }, session: { state } } = ctx;
  const type = sceneUtils.getActionType(input);
  state.type = type;
  await ctx.answerCbQuery('Тип измерения сохранён');
  await ctx.editMessageText('Введите значение измерения');
};

const onValueInput = async (ctx) => {
  const {
    from: { id },
    match: { input: plasma },
    session: {
      state: {
        userDate, meal, type,
      },
    },
  } = ctx;
  const newMeasurement = new Measurement({
    date: userDate || new Date(),
    plasma,
    blood: sceneUtils.convertPlasmaToBlood(plasma),
    meal,
    type,
    user: id,
  });

  try {
    await newMeasurement.save(newMeasurement);
    ctx.reply('Ваше измерение успешно сохранено!');
  } catch (err) {
    console.log('Something wrong', err);
  }

  const { session, scene } = ctx;
  session.state = utils.getSessionState(session);
  await scene.enter('main');
};

export default {
  onEnter,
  onMealAction,
  onTypeAction,
  onValueInput,
};

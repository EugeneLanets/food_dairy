import Measurement from '../../models/measurements.js';
import utils from '../../utils/index.js';

const onEnter = async (ctx) => {
  const keyboard = utils.getKeyboard('measurementTime', ctx);
  ctx.editMessageText(
    'Выберите приём пищи',
    keyboard,
  );
};

const onMealAction = async (ctx) => {
  const { match: { input } } = ctx;

  const meal = utils.getActionType(input);
  utils.setMeasurementTime(ctx, meal);

  await ctx.answerCbQuery('Время измерения сохранено');

  const keyboard = utils.getKeyboard('measurementType', ctx);
  await ctx.editMessageText('До или после приёма пищи', keyboard);
};

const onTypeAction = async (ctx) => {
  const { match: { input } } = ctx;
  const type = utils.getActionType(input);
  utils.setMeasurementType(ctx, type);
  await ctx.answerCbQuery('Тип измерения сохранён');
  await ctx.editMessageText('Введите значение измерения');
};

const onValueInput = async (ctx) => {
  const {
    from: { id },
    match: { input: plasma },
  } = ctx;
  const state = utils.getState(ctx);
  const {
    userDate, measurementTime, measurementType,
  } = state;
  const newMeasurement = new Measurement({
    date: userDate || utils.getToday(new Date()),
    plasma,
    blood: utils.convertPlasmaToBlood(plasma),
    meal: measurementTime,
    type: measurementType,
    user: id,
  });

  try {
    await newMeasurement.save(newMeasurement);
    await ctx.reply('Ваше измерение успешно сохранено!');
  } catch (err) {
    console.log('Something wrong', err);
  }

  utils.initState(ctx);

  await ctx.scene.enter('main');
};

export default {
  onEnter,
  onMealAction,
  onTypeAction,
  onValueInput,
};

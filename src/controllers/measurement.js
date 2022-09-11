import { Markup, Scenes } from 'telegraf';
import Measurement from '../models/measurements.js';
import { convertPlasmaToBlood, getMeasurementType } from '../utils/utils.js';

const measurement = new Scenes.BaseScene('measurement');

measurement.enter((ctx) => {
  console.log(ctx.session);
  ctx.reply(
    'Вносим значение до или после еды',
    Markup.inlineKeyboard([
      Markup.button.callback('До еды', 'BEFORE_FOOD'),
      Markup.button.callback('После еды', 'AFTER_FOOD'),
    ]),
  );
});

measurement.command('main', (ctx) => {
  ctx.scene.enter('main');
});

measurement.action(
  /[A-Z]*_FOOD/,
  (ctx) => {
    const type = getMeasurementType(ctx.match.input);
    ctx.session.currentMeasurement.type = type;
    ctx.reply(
      'Что дальше?',
      Markup.inlineKeyboard([
        Markup.button.callback('Ввести значение', 'VALUE'),
        Markup.button.callback(
          'Выбрать дату и время измерения',
          'SET_DATETIME',
        ),
      ]),
    );
  },
);

measurement.action(
  /SET_DATETIME/,
  (ctx) => {
    ctx.scene.enter('time');
  },
);

measurement.hears(
  /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/,
  async (ctx) => {
    const uid = ctx.from.id;
    const plasma = Number(ctx.match.input);
    const blood = convertPlasmaToBlood(plasma);

    const newMeasurement = new Measurement({
      date: new Date(),
      plasma,
      blood,
      type: ctx.session.currentMeasurement.type,
      user: uid,
    });
    await newMeasurement.save();
  },
);

export default measurement;

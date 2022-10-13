import fs from 'fs';
import path from 'path';
import Measurements from '../models/measurements.js';
import utils from './utils.js';
import mainUtils from '../utils/utils.js';

const onMeasurementsSave = async (ctx) => {
  const { from: { id } } = ctx;
  const fullName = path.join(process.cwd(), 'data', 'measurements.json');
  const data = fs.readFileSync((fullName));
  const { measurements } = JSON.parse(data);
  const entries = Object.entries(measurements);
  const length = entries.length * 6;
  let count = 0;

  entries.forEach((entry) => {
    const [date, values] = entry;

    values.forEach(async (value, idx) => {
      const { meal, type } = utils.getMealAndType(idx);
      const newMeasurement = new Measurements({
        date: mainUtils.getUserDate(date),
        plasma: value,
        blood: mainUtils.convertPlasmaToBlood(value),
        meal,
        type,
        user: id,
      });

      try {
        await newMeasurement.save(newMeasurement);
        await count++;
        console.log(`Сохранено ${count} из ${length} измерений`);
      } catch (err) {
        console.log('Something wrong', err);
      }
    });
  });
};

const onMeasurementsGet = async () => {
  const a = new Date(new Date(2022, 8, 9));
  console.log(a.toString());
  const $lt = new Date(3000, 0, 1);
  const $gt = a;
  const results = await Measurements.find(
    {
      date:
        { $lt, $gt },
    },
  ).exec();
  console.log(results.length);
};

const onStart = async (ctx) => {
  await ctx.scene.enter('start');
};

export default {
  onMeasurementsSave,
  onMeasurementsGet,
  onStart,
};

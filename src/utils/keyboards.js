import { Markup } from 'telegraf';
import utils from './utils.js';

const start = [
  Markup.button.callback(
    'Вносим',
    'SET_ACTION',
  ),
  Markup.button.callback(
    'Получаем',
    'GET_ACTION',
  ),
];
const measurementTime = [
  Markup.button.callback('Завтрак', 'BREAKFAST_ACTION'),
  Markup.button.callback('Обед', 'LUNCH_ACTION'),
  Markup.button.callback('Ужин', 'DINNER_ACTION'),
];
const measurementType = [
  Markup.button.callback('До', 'BEFORE_EAT'),
  Markup.button.callback('После', 'AFTER_EAT'),
];
const foodTime = [
  Markup.button.callback('Завтрак', 'BREAKFAST_ACTION'),
  Markup.button.callback('Перекус ', 'SNACK_ACTION'),
  Markup.button.callback('Обед', 'LUNCH_ACTION'),
  Markup.button.callback('Полдник', 'AFTERNOON_ACTION'),
  Markup.button.callback('Ужин', 'DINNER_ACTION'),
];

const getMainKeyboard = (ctx) => {
  const { userDate } = utils.getState(ctx);
  const isDateSet = Boolean(userDate);

  const dateButtonMessages = {
    true: 'Сбросить дату',
    false: 'Установить дату',
  };

  const keyboard = [
    Markup.button.callback(
      'Измерение',
      'MEASUREMENTS_ACTION',
    ),
    Markup.button.callback(
      'Приём пищи',
      'FOOD_ACTION',
    ),
    Markup.button.callback(
      dateButtonMessages[isDateSet],
      'SET_DATE',
    ),
  ];

  return keyboard;
};

const getKeyboard = (type, ctx) => {
  const main = getMainKeyboard(ctx);

  const keyboards = {
    start,
    main,
    measurementTime,
    measurementType,
    foodTime,
  };
  const keyboard = keyboards[type];
  return Markup.inlineKeyboard(keyboard);
};

export default {
  getKeyboard,
};

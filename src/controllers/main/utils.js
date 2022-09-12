import { Markup } from 'telegraf';

const getMainKeyboard = (isDateSet = false) => {
  const dateButtonMessages = {
    true: 'Сбросить дату',
    false: 'Установить дату',
  };

  const keyboard = [
    Markup.button.callback(
      'Внести измерение',
      'MEASUREMENT_ACTION',
    ),
    Markup.button.callback(
      'Внести приём пищи',
      'FOOD_ACTION',
    ),
    Markup.button.callback(
      dateButtonMessages[isDateSet],
      'SET_DATE',
    ),
  ];

  return Markup.inlineKeyboard(keyboard);
};

export default {
  getMainKeyboard,
};

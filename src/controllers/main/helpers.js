import { Markup } from 'telegraf';

// eslint-disable-next-line import/prefer-default-export
export const getMainKeyboard = (isDateSet) => {
  const dateStatus = isDateSet ? 'set' : 'notset';
  const dateButtonMessages = {
    set: 'Сбросить дату',
    notset: 'Установить дату',
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
      dateButtonMessages[dateStatus],
      'SET_DATE',
    ),
  ];

  return Markup.inlineKeyboard(keyboard);
};

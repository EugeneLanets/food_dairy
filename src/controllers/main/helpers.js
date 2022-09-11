import { Markup } from 'telegraf';

// eslint import/prefer-default-export: false;
export const getMainKeyboard = (isDateSet) => {
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

export const getSessionState = (session, action = 'SET') => {
  if (session.state && action !== 'RESET') {
    const { userDate } = session.state;
    return { userDate };
  }

  return { userDate: false };
};

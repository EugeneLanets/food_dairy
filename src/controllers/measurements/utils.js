import { Markup } from 'telegraf';

const getActionType = (str, separator = '_') => (
  str.split(separator)[0].toLowerCase()
);

const convertPlasmaToBlood = (value) => 0.88 * value;

const getKeyboard = (type) => {
  const keyboards = {
    meal: [
      Markup.button.callback('Завтрак', 'BREAKFAST_ACTION'),
      Markup.button.callback('Обед', 'LUNCH_ACTION'),
      Markup.button.callback('Ужин', 'DINNER_ACTION'),
    ],
    type: [
      Markup.button.callback('До еды', 'BEFORE_EAT'),
      Markup.button.callback('После еды', 'AFTER_EAT'),
    ],
  };

  return Markup.inlineKeyboard(keyboards[type]);
};

export default {
  convertPlasmaToBlood,
  getActionType,
  getKeyboard,
};

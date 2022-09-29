import { Markup } from 'telegraf';

const getKeyboard = (type) => {
  const keyboards = {
    meal: [
      Markup.button.callback('Завтрак', 'BREAKFAST_ACTION'),
      Markup.button.callback('Перекус ', 'SNACK_ACTION'),
      Markup.button.callback('Обед', 'LUNCH_ACTION'),
      Markup.button.callback('Полдник', 'AFTERNOON_ACTION'),
      Markup.button.callback('Ужин', 'DINNER_ACTION'),
    ],
    menu: [
      Markup.button.callback('Описание', 'DESCRIPTION'),
      Markup.button.callback('Ингредиенты', 'INGREDIENTS'),
    ],
  };

  return Markup.inlineKeyboard(keyboards[type]);
};

export default {
  getKeyboard,
};

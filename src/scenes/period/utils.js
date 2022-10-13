import { Markup } from 'telegraf';

const getKeyboard = () => {
  const keyboard = [
    Markup.button.callback(
      'Установить начало периода',
      'START_PERIOD_ACTION',
    ),
    Markup.button.callback(
      'Установить конец периода',
      'END_PERIOD_ACTION',
    ),
  ];

  return Markup.inlineKeyboard(keyboard);
};

export default {
  getKeyboard,
};

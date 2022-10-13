import utils from './utils.js';

const onEnter = (ctx) => {
  ctx.editMessageText('Выберите период', utils.getKeyboard());
};

export default {
  onEnter,
};

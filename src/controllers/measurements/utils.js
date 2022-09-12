const getActionType = (str, separator = '_') => (
  str.split(separator)[0].toLowerCase()
);

const convertPlasmaToBlood = (value) => 0.88 * value;

export default {
  convertPlasmaToBlood,
  getActionType,
};

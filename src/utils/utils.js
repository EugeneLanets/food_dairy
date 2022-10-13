const getState = (ctx) => ctx.session.state;

const getDefaultState = (ctx) => {
  const uid = ctx.from.id;
  const firstName = ctx.from.first_name;
  const userDate = ctx.session?.state?.userDate;

  return {
    firstName,
    uid,
    userDate: userDate || false,
  };
};

const initState = (ctx) => {
  ctx.session.state = getDefaultState(ctx);
};

const setUserDate = (ctx, userDate = false) => {
  const state = getState(ctx);
  state.userDate = userDate;
};

const setMeasurementTime = (ctx, measurementTime) => {
  const state = getState(ctx);
  state.measurementTime = measurementTime;
};

const setMeasurementType = (ctx, measurementType) => {
  const state = getState(ctx);
  state.measurementType = measurementType;
};

const setFoodTime = (ctx, foodTime) => {
  const state = getState(ctx);
  state.foodTime = foodTime;
};

const setFoodDescription = (ctx, foodDescription) => {
  const state = getState(ctx);
  state.foodDescription = foodDescription;
};

const getActionType = (str, separator = '_') => (
  str.split(separator)[0].toLowerCase()
);

const getToday = (date) => date.setHours(0, 0, 0, 0);

const getUserDate = (dateString) => new Date(dateString.split('-').reverse().join('-'));

const convertPlasmaToBlood = (value) => 0.88 * value;

export default {
  convertPlasmaToBlood,
  getActionType,
  getToday,
  getUserDate,
  initState,
  getState,
  setUserDate,
  setMeasurementTime,
  setMeasurementType,
  setFoodTime,
  setFoodDescription,
};

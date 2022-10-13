const getMeal = (idx) => {
  switch (idx) {
    case 0:
    case 1:
      return 'breakfast';
    case 2:
    case 3:
      return 'lunch';
    case 4:
    case 5:
      return 'dinner;';
    default:
      return undefined;
  }
};

const getType = (idx) => {
  switch (idx) {
    case 0:
    case 2:
    case 4:
      return 'before';
    case 1:
    case 3:
    case 5:
      return 'after';
    default:
      return undefined;
  }
};

const getMealAndType = (idx) => ({
  meal: getMeal(idx),
  type: getType(idx),
});

export default {
  getMealAndType,
};

const getSessionState = (session, action = 'SET') => {
  if (session.state && action !== 'RESET') {
    const { userDate } = session.state;
    return { userDate };
  }

  return { userDate: false };
};

const getActionType = (str, separator = '_') => (
  str.split(separator)[0].toLowerCase()
);

export default {
  getSessionState,
  getActionType,
};

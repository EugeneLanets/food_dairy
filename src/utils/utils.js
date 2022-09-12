const getSessionState = (session, action = 'SET') => {
  if (session.state && action !== 'RESET') {
    const { userDate } = session.state;
    return { userDate };
  }

  return { userDate: false };
};

export default {
  getSessionState,
};

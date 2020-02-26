import signale from 'signale';

signale.config({
  displayTimestamp: true,
  displayDate: true,
});

const logger = (func, message, args) => {
  if (args) {
    signale[func](message, args);
  } else {
    signale[func](message);
  }
};

export default  {
  log (message, args) {
    logger('success', message, args);
  },
  error(message, args) {
    logger('fatal', message, args);
  },
  debug(message, args) {
    logger('debug', message, args);
  }
};
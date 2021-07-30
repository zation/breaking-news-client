import logger from './logger';

export default () => (next) => (action) => {
  if (action.error) {
    logger.error(action);
  } else if (__DEV__) {
    logger.info(action.type);
  }

  return next(action);
};

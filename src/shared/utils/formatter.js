import { isFinite } from 'lodash/fp';
import BigNumber from 'bignumber.js';

export const cryptoNumber = ({ digit = 8, defaultDisplay = '--', currency } = {}) => (value) => {
  if (isFinite(value)) {
    const finalValue = value === 0
      ? value
      : new BigNumber(
        Math.floor(new BigNumber(value).multipliedBy(10 ** digit).toNumber()),
      ).dividedBy(10 ** digit).toNumber().toFixed(digit);
    return currency ? `${finalValue} ${currency}` : finalValue;
  }
  return defaultDisplay;
};

export const unitNumber = ({ digit = 0, defaultDisplay = '--' } = {}) => (value) => {
  if (isFinite(value)) {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(digit)} T`;
    }
    return `${(value / 1e3).toFixed(digit)} K`;
  }
  return defaultDisplay;
};

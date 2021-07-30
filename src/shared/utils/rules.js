const isNumeric = (str) => !Number.isNaN(str) && !Number.isNaN(parseFloat(str));

export const createAmountRule = (i18n) => () => ({
  async validator(rule, value) {
    if (isNumeric(value) && Number(value) === parseInt(value, 10) && Number(value) > 0) {
      return undefined;
    }
    throw i18n('amountInvalid');
  },
});

export const createPriceRule = (i18n) => () => ({
  async validator(rule, value) {
    if (isNumeric(value) && Number(value) > 0) {
      return undefined;
    }
    throw i18n('priceInvalid');
  },
});

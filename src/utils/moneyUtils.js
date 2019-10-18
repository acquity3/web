const moneyFormatter = num => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}G`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return parseFloat(num).toFixed(2);
};

const validateMoneyString = string => {
  if (string) {
    return string.match(/^[0-9]+(\.[0-9]{1,2})?$/gm);
  }
  return false;
};

export { moneyFormatter, validateMoneyString };

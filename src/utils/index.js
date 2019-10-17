const getInitials = fullName => {
  const names = fullName.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

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
  return num;
};

const validateMoneyString = string => {
  if (string) {
    return string.match(/^[0-9]+(\.[0-9]{1,2})?$/gm);
  }
  return false;
};

// eslint-disable-next-line import/prefer-default-export
export { getInitials, moneyFormatter, validateMoneyString };

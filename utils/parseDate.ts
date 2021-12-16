export const parseDateTime = (date: string): string => {
  const dateObj = new Date(date);
  const localeDate = dateObj.toLocaleDateString();
  const localeTime = dateObj.toLocaleTimeString().slice(0, 5);
  return `${localeTime} ${localeDate}`;
};

export const parseDate = (date: string): string => {
  const dateObj = new Date(date);
  const weekday = dateObj.toUTCString().slice(0, 3);
  const utcDate = dateObj.getUTCDate();
  const utcMonth = dateObj.getUTCMonth() + 1;
  const utcFullYear = dateObj.getUTCFullYear();
  return `${weekday}, ${utcDate}/${utcMonth}/${utcFullYear}`;
};

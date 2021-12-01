export const parseDate = (date: string): string => {
  const dateObj = new Date(date);
  const localeDate = dateObj.toLocaleDateString();
  const localeTime = dateObj.toLocaleTimeString().slice(0, 5);
  return `${localeTime} ${localeDate}`;
};

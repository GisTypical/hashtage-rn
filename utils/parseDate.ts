import { Post, RetweetType } from "./types";

export const parseDate = (date: string): string => {
  const dateObj = new Date(date);
  const localeDate = dateObj.toLocaleDateString();
  const localeTime = dateObj.toLocaleTimeString().slice(0, 5);
  return `${localeTime} ${localeDate}`;
};

export const sortByTime = (posts: any[]) => {
  return posts.sort((a, b) => {
    let aDate: string;
    let bDate: string;
    if (a.date) {
      aDate = a.date;
    } else {
      aDate = a.post_id.date;
    }
    if (b.date) {
      bDate = b.date;
    } else {
      bDate = b.post_id.date;
    }
    console.log(new Date(aDate), new Date(bDate));
    return new Date(bDate) - new Date(aDate);
  });
};

import { Post } from "./types";

export const parseDate = (date: string): string => {
  const dateObj = new Date(date);
  const localeDate = dateObj.toLocaleDateString();
  const localeTime = dateObj.toLocaleTimeString().slice(0, 5);
  return `${localeTime} ${localeDate}`;
};

export const sortByTime = (posts: Post[]) => {
  return posts.sort((a, b) => {
    console.log(new Date(b.date!) - new Date(a.date!));
    return new Date(b.date!) - new Date(a.date!);
  });
};

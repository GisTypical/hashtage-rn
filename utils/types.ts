export interface User {
  _id?: string;
  password: string;
  username: string;
  followers?: any[];
  following?: any[];
  full_name?: string;
}

export interface Message {
  accessToken: string;
  refreshToken: string;
}

export interface Post {
  author: User;
  date: string;
  id: string;
  images: string[];
  retweets_count: number;
  text: string;
}

export interface PostRoot {
  posts: Post[];
}

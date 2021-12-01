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
  text: string;
  images?: string[];
  imagesUp?: {
    uri: string;
    name: string;
  };
  author?: User;
  date?: string;
  id?: string;
  retweets_count?: number;
}

export interface PostRoot {
  posts: Post[];
}

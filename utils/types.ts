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
  id?: string;
  text: string;
  author?: User;
  date?: string;
  didRetweet?: boolean;
  isAuthor?: boolean;
  retweets_count?: number;
  comments_count?: number;
  images?: string[];
  imagesUp?: {
    uri: string;
    name: string;
  };
}

export interface PostRoot {
  posts: Post[];
}

// RETWEET

export interface RetweetType {
  id: string;
  post_id: Post;
  user_id: User;
}

export interface Author {
  _id: ID;
  followers: any[];
  following: any[];
  full_name: string;
  password: string;
  username: string;
}

export interface ID {
  $oid: string;
}

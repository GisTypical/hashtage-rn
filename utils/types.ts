export interface User {
  id?: string;
  password: string;
  username: string;
  full_name?: string;
}

export interface UserProfile {
  id: string;
  password: string;
  username: string;
  full_name: string;
  followers: number;
  following: number;
  address?: string;
  bio?: string;
  birthday?: string;
  isFollower: boolean;
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
  children?: Post[];
  parent?: {
    id: string;
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

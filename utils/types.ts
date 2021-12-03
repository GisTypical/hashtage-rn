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
  comments_count?: number;
  didRetweet?: boolean;
  isAuthor?: boolean;
}

export interface PostRoot {
  posts: Post[];
}

// RETWEET

export interface Id {
  $oid: string;
}

export interface Author {
  $oid: string;
}

export interface Date {
  $date: number;
}

export interface PostId {
  _id: Id;
  author: Author;
  date: Date;
  img_path: string;
  text: string;
}

export interface Id2 {
  $oid: string;
}

export interface UserId {
  _id: Id2;
  followers: any[];
  following: any[];
  full_name: string;
  password: string;
  username: string;
}

export interface RetweetType {
  id: string;
  post_id: PostId;
  user_id: UserId;
}

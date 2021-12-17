export interface User {
  password: string;
  username: string;
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
  following: number;
}

export interface Post {
  id?: string;
  text: string;
  author?: UserProfile;
  date?: string;
  didRetweet?: boolean;
  didLike?: boolean;
  isAuthor?: boolean;
  retweets_count?: number;
  comments_count?: number;
  likes_count?: number;
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
  user_id: UserProfile;
}

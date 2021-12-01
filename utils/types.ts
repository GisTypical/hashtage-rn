export interface User {
  username: string;
  fullName?: string;
  password: string;
}

export interface Message {
  accessToken: string;
  refreshToken: string;
}

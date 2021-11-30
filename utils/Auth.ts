import axios from "axios";
import { User } from "./types";

export const register = (user: User) => {
  return axios.post("http://192.168.100.9:3000/register", user);
};

export const login = (user: User) => {
  return axios.post("http://192.168.100.9:3000/login", user);
};

import { User } from "./user.interface";

export interface UserLoginResponse {
  user:  User;
  token: string;
}


export interface Login {
  email:    string;
  password: string;
}

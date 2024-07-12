import { User } from "./user.interface";

export interface UserRegisterResponse {
  user:  User;
  token: string;
}

export interface RegisterData {
  email:    string;
  password: string;
  name: string;
  role: RoleEnum
}

type RoleEnum = ['user' | 'admin' | 'customer']

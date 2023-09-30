export interface AuthForm {
  email: string;
  password: string;
}

export type AuthType = "registration" | "login";

export interface AuthValidation {
  email: boolean;
  password: boolean;
}

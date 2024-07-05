import { User } from "firebase/auth";

export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface IAuthState {
  isAuthenitcated: boolean;
  user: User | {};
  signIn: (
    email: string,
    password: string
  ) => Promise<
    | { success: boolean; data: User }
    | { success: boolean; data: string }
    | undefined
  >;
  signOut: () => void;
  signUp: ({
    email,
    password,
    username,
  }: Omit<IRegisterForm, "repeatPassword">) => Promise<
    | { success: boolean; data: User }
    | { success: boolean; data: string }
    | undefined
  >;
  loginAction: () => void;
}

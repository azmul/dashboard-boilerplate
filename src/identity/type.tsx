export type LoginFieldType = {
  username?: string;
  password?: string;
};

export type JwtPayload = {
  roles: string[];
  exp: number;
  sub: number;
  username: string;
};
export interface LoginUser {
  username: string;
  password: string;
  companyId?: number;
}
export interface RegisterUser extends LoginUser {
  name: string;
  email: string;
}

export interface PasswordReset {
  token: string;
  password: string;
  email: string;
}

export interface ForgotPassword {
  email: string;
}
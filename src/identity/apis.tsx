import { api } from "@/api/apiHelper";
import { Endpoints } from "@/api/apiConst";
import * as IdentityType from "./type";
import { token } from "./constant";

/**
 * Register User
 * @returns {Auth Response}
 */
export const registerUser = async (
  user: IdentityType.RegisterUser,
  params?: any
): Promise<any> =>
  await api.post(Endpoints.AUTH + "/register", user, {
    params,
  });

/**
 * Login User
 * @returns {Auth Response}
 */
export const loginUser = async () // user: IdentityType.LoginUser,
// params?: any
: Promise<any> => {
  // await api.post(Endpoints.AUTH + "/login", user, {
  //   params,
  // });

  return Promise.resolve({ accessToken: token, refreshToken: token });
};

/**
 * Refresh Token
 * @returns {Auth Response}
 */
export const refreshToken = (refreshToken: string): Promise<any> => {
  return api
    .post(Endpoints.AUTH + "/refresh-token", { refreshToken })
    .then((response) => response.data.data);
};

/**
 * Refresh Token
 * @returns {Auth Response}
 */
export const passwordReset = async (
  user: IdentityType.PasswordReset,
  params?: any
): Promise<any> =>
  await api.post(Endpoints.AUTH + "/password-reset", user, {
    params,
  });

/**
 * forgot Password
 * @returns {Auth Response}
 */
export const forgotPassword = async (
  user: IdentityType.ForgotPassword,
  params?: any
): Promise<any> =>
  await api.post(Endpoints.AUTH + "/forgot-password", user, {
    params,
  });

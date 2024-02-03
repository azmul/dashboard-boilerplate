import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { message } from "antd";
import qs from "query-string";
import { getTokens } from "@/identity/helpers";
import * as authApi from "@/identity/apis";
import { saveTokens, logout } from "@/identity/helpers";
import { ResponseStatus } from "./apiConst";
import { ENV } from "./config";

interface MyWindow extends Window {}
declare var window: MyWindow;

/** Setup an API instance */
export const api = axios.create({
  baseURL: ENV.API_HOST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "index" });
  },
});

/**
 * Adds autherization headers to API calls
 * @param {InternalAxiosRequestConfig} request
 */
api.interceptors.request.use(
  async (
    request: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig<any>> => {
    const { accessToken } = getTokens();

    request.headers["Authorization"] = `Bearer ${accessToken}`;

    return request;
  }
);

/** Response interceptor for API calls and refresh token handing */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error?.response.status.toString().startsWith("5")) {
      message.error("ServerError");
      return Promise.reject(error);
    }
    /**
     * FIXME:
     * Refresh token need to be fixed
     * 
     * TODO:
     * Have to remove the below if statement when refresh token will be fixed
     */
    if(error?.response?.status === ResponseStatus.UNAUTHORIZED) 
    {
      message.error("Token Expired");
      logout();
      return Promise.reject(error);
    }

    if (
      (error?.response?.status === ResponseStatus.TOKEN_EXPIRED || error?.response?.status === ResponseStatus.UNAUTHORIZED) &&
      !originalRequest._retry
    ) {
      const { refreshToken } = getTokens();
      originalRequest._retry = true;

      const token: { accessToken: string; refreshToken: string } =
        await authApi.refreshToken(refreshToken);
      saveTokens(token.accessToken, token.refreshToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

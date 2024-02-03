import * as SIGN_IN_ROUTERS from "@/pages/signin/router";
import * as FORGOT_PASSWORD_ROUTER from "@/pages/forgot-password/router";
import * as RESET_PASSWORD_ROUTER from "@/pages/password-reset/router";

export const PUBLIC_ROUTERS = {
  ...SIGN_IN_ROUTERS,
  ...FORGOT_PASSWORD_ROUTER,
  ...RESET_PASSWORD_ROUTER,
};

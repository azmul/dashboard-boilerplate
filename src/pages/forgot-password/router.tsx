import * as RouterType from "@/routers/type";
import HomePage from "./page";

export const PASSWORD_FORGOT_SCREEN: RouterType.RouteItemType = {
  path: "/forgot-password",
  title: "Forgot Password",
  component: HomePage,
  hasAll: false,
};

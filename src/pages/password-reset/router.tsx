import * as RouterType from "@/routers/type";
import HomePage from "./page";

export const PASSWORD_RESET_SCREEN: RouterType.RouteItemType = {
  path: "/password-reset",
  title: "Reset Password",
  component: HomePage,
  hasAll: false,
};

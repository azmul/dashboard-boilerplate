import * as RouterType from "@/routers/type";
import HomePage from "./page";

export const SIGN_IN_SCREEN: RouterType.RouteItemType = {
  path: "/sign-in",
  title: "Sign In",
  component: HomePage,
  hasAll: false,
};

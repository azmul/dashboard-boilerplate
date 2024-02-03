import * as RouterType from "@/routers/type";
import { UserRoles } from "@/identity/scopes";
import HomePage from "./page";

export const CHANGE_PASSWORD_SCREEN: RouterType.RouteItemType = {
  path: "/change-password",
  title: "Change Password",
  permissions: [UserRoles.USER],
  component: HomePage,
  hasAll: false,
};

import * as RouterType from "@/routers/type";
import { UserRoles } from "@/identity/scopes";
import HomePage from "./page";

export const PROFILE_SCREEN: RouterType.RouteItemType = {
  path: "/profile",
  title: "Profile",
  permissions: [UserRoles.USER],
  component: HomePage,
  hasAll: false,
};

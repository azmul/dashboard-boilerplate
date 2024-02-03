import * as RouterType from "@/routers/type";
import { RouterParameters } from "@/routers/constant";
import { UserRoles } from "@/identity/scopes";
import HomePage from "./page";

export const TODO_SCREEN: RouterType.RouteItemType = {
  path: "/todo",
  title: "Todo",
  permissions: [UserRoles.USER],
  component: HomePage,
  hasAll: false,
};

export const TODO_EDIT_SCREEN: RouterType.RouteItemType = {
  ...TODO_SCREEN,
  path: TODO_SCREEN.path + RouterParameters.ID,
  title: "Edit Todo",
};

export const TODO_CREATE_SCREEN: RouterType.RouteItemType = {
  ...TODO_SCREEN,
  path: TODO_SCREEN.path + RouterParameters.CREATE,
  title: "Create Todo",
};

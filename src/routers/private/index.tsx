import * as DASHBOARD_ROUTER from "@/pages/dashboard/router";
import * as REGIONS_ROUTER from "@/pages/todos/router";
import * as PROFILE_ROUTER from "@/pages/profile/router";
import * as CHANGE_PASSWORD from "@/pages/change-password/router";

export const PRIVATE_ROUTERS = {
  ...DASHBOARD_ROUTER,
  ...REGIONS_ROUTER,
  ...PROFILE_ROUTER,
  ...CHANGE_PASSWORD,
};

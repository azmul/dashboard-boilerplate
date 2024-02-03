import { DASHBOARD_MENUS } from "@/pages/dashboard/menu";
import { TODO_MENUS } from "@/pages/todos/menu";
// import { HomeOutlined } from "@ant-design/icons";
import { MenuItemsType } from "./type";

const FILTER_MUNUS: MenuItemsType = {
  label: "Todo Management",
  key: "todo",
  // icon: <HomeOutlined />,
  children: [TODO_MENUS],
};

export const MENU_ITEMS = [DASHBOARD_MENUS, FILTER_MUNUS];

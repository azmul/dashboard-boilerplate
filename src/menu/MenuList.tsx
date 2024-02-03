import { Menu } from "antd";
// import cx from "classnames";
// import { RoutePermission } from "@/routers/private/PrivateRouteRender";
import { MENU_ITEMS } from ".";
// import { MenuItemsType } from "./type";
import styles from "./MenuList.module.scss";

export default function MenuList() {
  return (
    <Menu
      className={styles.menu}
      key="app-menus"
      defaultSelectedKeys={['Dashboard']}
      mode="inline"
      items={MENU_ITEMS}
    />
  );
}

import { Menu, Image } from "antd";
// import cx from "classnames";
// import { RoutePermission } from "@/routers/private/PrivateRouteRender";
import { MENU_ITEMS } from ".";
// import { MenuItemsType } from "./type";
import LOGO from "@/assets/images/logoipsum-239.svg";
import styles from "./MenuList.module.scss";

export default function MenuList() {
  return (
    <>
      <br />
      <Image width={200} height={30} src={LOGO} />
      <br />
      <br />

      <Menu
        className={styles.menu}
        key="app-menus"
        defaultSelectedKeys={["Dashboard"]}
        mode="inline"
        items={MENU_ITEMS}
      />
    </>
  );
}

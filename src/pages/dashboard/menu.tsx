import { MenuItemType } from "@/menu/type";
import { PRIVATE_ROUTERS } from "@/routers/private";
import { NavLink } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

export const DASHBOARD_MENUS: MenuItemType = {
  label: (
    <NavLink
      data-testid="products-nav-button"
      to={PRIVATE_ROUTERS.DASHBOARD_SCREEN.path}
      end
    >
      Dashboard
    </NavLink>
  ),
  key: PRIVATE_ROUTERS.DASHBOARD_SCREEN.title,
  permission: [],
  icon: <HomeOutlined />,
};

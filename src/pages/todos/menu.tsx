import { MenuItemType } from "@/menu/type";
import { PRIVATE_ROUTERS } from "@/routers/private";
import { NavLink } from "react-router-dom";
import { BookOutlined } from "@ant-design/icons";

export const TODO_MENUS: MenuItemType = {
  label: (
    <NavLink
      data-testid="regions-nav-button"
      to={PRIVATE_ROUTERS.TODO_SCREEN.path}
      end
    >
      {PRIVATE_ROUTERS.TODO_SCREEN.title}
    </NavLink>
  ),
  key: PRIVATE_ROUTERS.TODO_SCREEN.title,
  permission: [],
  icon: <BookOutlined />,
};

import React, { useState } from "react";
import { Layout, theme, Dropdown, Space, Row } from "antd";
import { Outlet, NavLink } from "react-router-dom";
import { logout } from "@/identity/helpers";
import MenuList from "../menu/MenuList";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import useThemeStore from "@/state/theme";

// import styles from "./Layout.module.scss"

const { Header, Content, Footer, Sider } = Layout;

const LayoutCom: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const themeStore: any = useThemeStore();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <NavLink rel="noopener noreferrer" to="/profile">
          Profile
        </NavLink>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => themeStore?.toggleTheme(!themeStore?.theme)}
          rel="noopener noreferrer"
        >
          Toggle Theme
        </a>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => themeStore?.toggleCompact(!themeStore?.compact)}
          rel="noopener noreferrer"
        >
         Toggle Compact
        </a>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: "4",
      danger: true,
      label: (
        <a onClick={() => logout()} rel="noopener noreferrer">
          Logout
        </a>
      ),
      icon: <SmileOutlined />,
    },
  ];

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <MenuList />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Row justify="space-between">
            <Space>
              <BreadCrumb />
            </Space>

            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserAddOutlined />
                </Space>
              </a>
            </Dropdown>
          </Row>
        </Header>
        <Content
          style={{
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: 20,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Azmul
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutCom;

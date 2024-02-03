import { theme, ConfigProvider } from "antd";
import App from "../App";
import useThemeStore from "@/state/theme";

export default function ThemeProvider() {
  const themeStore: any = useThemeStore();

  return (
    <ConfigProvider
      theme={{
        algorithm: themeStore?.compact
          ? themeStore?.theme
            ? [theme.darkAlgorithm, theme.compactAlgorithm]
            : [theme.defaultAlgorithm, theme.compactAlgorithm]
          : themeStore?.theme
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          // Bg colors
          //   colorBgBase: "#1B1D21", // colorBgPrimary
          //   colorBgLayout: "#1B1D21", // colorBgPrimary
          //   colorBgSpotlight: "#FFFFFF", // colorBgSpotlight
          //   colorPrimaryBgHover: "#313337", // colorBgPrimaryHoverActive
          //   controlItemBgHover: "#313337", // colorBgPrimaryHoverActive
          //   colorPrimaryHover: "#2F8F5B", // colorBgAccentHoverActive
          //   colorPrimaryActive: "#2F8F5B", // colorBgAccentHoverActive
        },
      }}
    >
      <App />
    </ConfigProvider>
  );
}

import { Stack } from "expo-router";
import { ThemeProvider, useStyles, i18n, config } from "expo-helpers";
import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import { useEffect, useRef } from "react";
config.init({
  fontSizes: {},
});
i18n.init({
  translations: {
    en: require("../src/translations/en.json"),
    it: require("../src/translations/it.json"),
  },
});
function App() {
  const { colors } = useStyles();
  const firstRender = useRef<boolean>(true);
  useEffect(() => {
    if (firstRender.current) {
      setTimeout(() => {
        setStatusBarStyle(colors.isDark ? "light" : "dark", true);
      }, 100);
    } else {
      setStatusBarStyle(colors.isDark ? "light" : "dark", true);
    }
    firstRender.current = false;
  }, [colors.isDark]);

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTitleStyle: {
          color: colors.text,
        },
        contentStyle: {
          backgroundColor: colors.card,
        },
      }}
    />
  );
}

export default function () {
  return (
    <ThemeProvider>
      <StatusBar />
      <App />
    </ThemeProvider>
  );
}

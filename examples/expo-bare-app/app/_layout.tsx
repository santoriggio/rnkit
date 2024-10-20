import { Stack, router } from "expo-router";
import {
  useStyles,
  ThemeProvider,
  i18n,
  config,
  AlertProvider,
  ReloadProvider,
} from "expo-helpers";
import { View, Text, LogBox } from "react-native";
import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
LogBox.ignoreLogs([
  "[Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet.",
]);

config.init({
  themes: {
    flame: {
      isDark: false,
      text: "#4A1D1D", // Un marrone scuro per il testo
      card: "#FFF1E6", // Un bianco crema per le carte
      background: "#FFDDD2", // Un rosa molto chiaro per lo sfondo
      border: "#D62828", // Un rosso intenso per i bordi
      primary: "#D62828", // Un rosso acceso per il colore principale
      secondary: "#6A040F", // Un rosso scuro per il colore secondario
      info: "#E85D04", // Un arancione per le informazioni
      warning: "#FFBA08", // Un giallo acceso per gli avvisi
      success: "#F48C06", // Un arancione chiaro per i successi
      danger: "#9D0208", // Un rosso scurissimo per i pericoli
      link: "#D62828", // Rosso acceso per i link
      gray: "#7E7E7E",
    },
    forest: {
      isDark: false,
      text: "#2D6A4F", // Un verde scuro per il testo
      card: "#D8F3DC", // Un verde molto chiaro per le carte
      background: "#E9F5EB", // Un verde chiarissimo per lo sfondo
      border: "#74C69D", // Un verde chiaro per i bordi
      primary: "#40916C", // Un verde acceso per il colore principale
      secondary: "#2D6A4F", // Un verde scuro per il colore secondario
      info: "#95D5B2", // Verde chiaro per le informazioni
      warning: "#FFC300", // Un giallo per gli avvisi
      success: "#1B998B", // Un verde acqua per i successi
      danger: "#D90429", // Un rosso per i pericoli
      link: "#40916C", // Verde acceso per i link
      gray: "#6E7573",
    },
    flame_dark: {
      isDark: true,
      text: "#FFD1A1", // Un arancione chiaro per il testo
      card: "#3E1F1F", // Un marrone scuro per le carte
      background: "#2D1B1B", // Un marrone molto scuro per lo sfondo
      primary: "#FF6B6B", // Un rosso acceso per il colore principale
      border: "#D62828", // Un rosso intenso per i bordi
      secondary: "#6A040F", // Un rosso scuro per il colore secondario
      info: "#E85D04", // Un arancione per le informazioni
      warning: "#FFBA08", // Un giallo acceso per gli avvisi
      success: "#F48C06", // Un arancione chiaro per i successi
      danger: "#9D0208", // Un rosso scurissimo per i pericoli
      link: "#FF6B6B", // Rosso acceso per i link
      gray: "#A89F9D", // Un grigio chiaro per elementi neutri
    },
    forest_dark: {
      isDark: true,
      text: "#A8E0D6", // Un verde chiaro per il testo
      card: "#1B4332", // Un verde molto scuro per le carte
      background: "#081C15", // Un verde scurissimo per lo sfondo
      border: "#74C69D", // Un verde chiaro per i bordi
      primary: "#95D5B2", // Un verde chiaro per il colore principale
      secondary: "#1B4332", // Un verde molto scuro per il colore secondario
      info: "#40916C", // Verde scuro per le informazioni
      warning: "#FFC300", // Un giallo per gli avvisi
      success: "#1B998B", // Un verde acqua per i successi
      danger: "#D90429", // Un rosso per i pericoli
      link: "#95D5B2", // Verde chiaro per i link
      gray: "#6D7575", // Un grigio verde scuro per elementi neutri
    },
  },
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
        headerTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.text,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="(screens)/modal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

export default function() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReloadProvider
        content={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Loading</Text>
            </View>
          );
        }}
      >
        <BottomSheetModalProvider>
          <ThemeProvider>
            <StatusBar />
            <App />
            <AlertProvider />
          </ThemeProvider>
        </BottomSheetModalProvider>
      </ReloadProvider>
    </GestureHandlerRootView>
  );
}

import { createContext, useContext, useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ReloadProviderProps } from "../types";
import { StyleSheet } from "react-native";

type ReloadCTXType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const ReloadCTX = createContext<ReloadCTXType>({
  loading: false,
  setLoading: () => null,
});

export function useReload() {
  return useContext(ReloadCTX);
}

export default function ReloadProvider({
  children,
  content,
}: ReloadProviderProps) {
  const [loading, set] = useState<boolean>(false);

  const setLoading = (newValue: boolean) => {
    set(newValue);
  };

  return (
    <ReloadCTX.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {loading && (
        <Animated.View
          style={{
            zIndex: 1000,
            backgroundColor: "#FFF",
            flex: 1,
            ...StyleSheet.absoluteFillObject,
          }}
          entering={FadeIn}
          exiting={FadeOut}
        >
          {content()}
        </Animated.View>
      )}
      {loading === false && children}
    </ReloadCTX.Provider>
  );
}

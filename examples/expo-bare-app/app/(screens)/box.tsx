import {
  ScrollView,
  Text as RNText,
  TouchableOpacity,
  View,
} from "react-native";
import { Box } from "expo-helpers";
import { Stack } from "expo-router";
import React, { useState } from "react";
export default function() {
  const [visible, setVisible] = useState<boolean>(false);
  const onPress = () => {
    setVisible((prev) => !prev);
  };
  return (
    <>
      <Stack.Screen options={{ title: "Box" }} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TouchableOpacity onPress={onPress}>
          <RNText>Press here</RNText>
        </TouchableOpacity>
        {visible && renderBoxs(100)}
      </ScrollView>
    </>
  );
}

function renderBoxs(length: number = 10, useViews: boolean = false) {
  return Array.from(Array(length).keys()).map((_) => {
    if (useViews) {
      return (
        <View key={_}>
          <RNText>{_}</RNText>
          <View>
            <RNText>{_}</RNText>
          </View>
        </View>
      );
    }
    return (
      <Box key={_} backgroundColor={"red"}>
        <RNText>{_}</RNText>
        <Box backgroundColor={"green"}>
          <RNText>{_}</RNText>
        </Box>
      </Box>
    );
  });
}


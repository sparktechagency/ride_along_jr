import { Text, View } from "react-native";

import { Stack } from "expo-router";
import React from "react";

const home = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Home" }} />
      <Text>home</Text>
    </View>
  );
};

export default home;

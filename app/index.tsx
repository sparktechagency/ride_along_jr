import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Link
        href={{
          pathname: "/home",
          params: { screen: "explore" },
        }}
      >
        Click
      </Link>
      <Text>Edit app/index. to this screen.</Text>
    </View>
  );
}

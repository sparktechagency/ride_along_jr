import { PrimaryColor } from "@/utils/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import tw from "@/lib/tailwind";

export default function RootLayout() {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Stack
        screenOptions={{
          statusBarAnimation: "fade",
          statusBarStyle: "dark",
          statusBarBackgroundColor: "white",
          // animation: "slide_from_right",

          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            statusBarAnimation: "fade",
            statusBarStyle: "light",
            statusBarBackgroundColor: PrimaryColor,
          }}
        />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/otp_verify" />
        <Stack.Screen name="auth/name" />
        <Stack.Screen name="terms_and_conditions" />
        <Stack.Screen name="privacy_policy" />
        <Stack.Screen
          name="search"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",
            contentStyle: tw`bg-transparent`,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}

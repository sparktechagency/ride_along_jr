import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PrimaryColor } from "@/utils/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import tw from "@/lib/tailwind";

export default function RootLayout() {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              statusBarAnimation: "fade",
              statusBarStyle: "dark",
              statusBarBackgroundColor: "white",
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
            <Stack.Screen name="passenger_map" />
            <Stack.Screen
              name="search"
              options={{
                presentation: "containedTransparentModal",
                animation: "slide_from_bottom",
                contentStyle: tw`bg-transparent `,

                // animation: "slide_from_bottom",
                // contentStyle: tw`bg-transparent pt-3`,
                // keyboardHandlingEnabled: true,
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

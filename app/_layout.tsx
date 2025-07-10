import "../lib/i18n/i18n"; // Import i18n configuration

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { PrimaryColor } from "@/utils/utils";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import store from "@/redux/store";
import tw from "@/lib/tailwind";

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* Wrapping the app with LanguageProvider for i18n support */}
      <LanguageProvider>
        <SafeAreaView style={tw`flex-1 bg-base`}>
          <GestureHandlerRootView
            style={{ flex: 1, backgroundColor: "transparent" }}
          >
            <BottomSheetModalProvider>
              {/* <StripeProvider
              publishableKey={
                "pk_test_51M6AQECe4QqAuKX4hQuRPLKDeB192L6xZiop8yWhLLrmbBTZjSsPKPyGvhhHVlKQNikct3mhaeZgyGjYTA17VwbT00l34SeOAr"
              }
              merchantIdentifier="merchant.identifier" // required for Apple Pay
              urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            > */}
              <Stack
                screenOptions={{
                  statusBarAnimation: "fade",
                  statusBarStyle: "dark",
                  statusBarBackgroundColor: "#EFF2F2",
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
                <Stack.Screen name="auth" />

                <Stack.Screen name="passenger" />
                <Stack.Screen name="driver" />

                <Stack.Screen name="terms_and_conditions" />
                <Stack.Screen name="privacy_policy" />
              </Stack>
              {/* </StripeProvider> */}
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaView>
      </LanguageProvider>
    </Provider>
  );
}

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PrimaryColor } from "@/utils/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import tw from "@/lib/tailwind";
export default function RootLayout() {
  return (
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
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/register" />
            <Stack.Screen name="auth/otp_verify" />
            <Stack.Screen name="passenger/name" />
            <Stack.Screen name="driver/name" />
            <Stack.Screen name="driver/contact_information" />
            <Stack.Screen name="terms_and_conditions" />
            <Stack.Screen name="privacy_policy" />

            <Stack.Screen name="passenger/where_go" />
            <Stack.Screen
              name="passenger/trip_done"
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="passenger/estimated_details"
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="passenger/arrived_done"
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="passenger/request_car"
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="passenger/driver_responding"
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="passenger/driver_arriving"
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="passenger/driver_arrived"
              options={{
                animation: "slide_from_right",
              }}
            />
          </Stack>
          {/* </StripeProvider> */}
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

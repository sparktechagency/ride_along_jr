import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ActivityIndicator, Image, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import tw from "@/lib/tailwind";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync(); // Prevent Expo's splash screen from auto-hiding

export default function App() {
  const onLayoutRootView = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      SplashScreen.hideAsync(); // Hide the splash screen once the app is ready
      const role = await AsyncStorage.getItem("role");
      // router.push("/auth/otp_verify");
      if (role === "passenger") {
        router.replace("/passenger/drawer/home");
      } else {
        router.replace("/driver/drawer/home");
      }
    } else {
      SplashScreen.hideAsync(); // Hide the splash screen once the app is ready
      router.replace("/auth/login");
    }
  };

  useEffect(() => {
    Font.loadAsync({
      NunitoSansBlack: require("@/assets/fonts/NunitoSans/NunitoSansBlack.ttf"),
      NunitoSansBold: require("@/assets/fonts/NunitoSans/NunitoSansBold.ttf"),
      NunitoSansExtraBold: require("@/assets/fonts/NunitoSans/NunitoSansExtraBold.ttf"),
      NunitoSansExtraLight: require("@/assets/fonts/NunitoSans/NunitoSansExtraLight.ttf"),
      NunitoSansLight: require("@/assets/fonts/NunitoSans/NunitoSansLight.ttf"),
      NunitoSansMedium: require("@/assets/fonts/NunitoSans/NunitoSansMedium.ttf"),
      NunitoSansRegular: require("@/assets/fonts/NunitoSans/NunitoSansRegular.ttf"),
      NunitoSansSemiBold: require("@/assets/fonts/NunitoSans/NunitoSansSemiBold.ttf"),
    });
    onLayoutRootView();
  }, []);

  return (
    <View style={tw`flex-1 justify-center items-center bg-[#5c7b7e] pb-[25%]`}>
      <Image
        source={require("@/assets/images/splash-icon.png")}
        style={tw`h-80 w-80 `}
      />
      <ActivityIndicator
        size="large"
        color="white"
        style={tw`absolute bottom-16`}
      />
    </View>
  );
}

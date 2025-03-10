import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ActivityIndicator, Image, View } from "react-native";

import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync(); // Prevent Expo's splash screen from auto-hiding

export default function App() {
  const route = useRouter();

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
    SplashScreen.hideAsync();
    setTimeout(() => {
      route?.replace("/home");
    }, 1000);
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

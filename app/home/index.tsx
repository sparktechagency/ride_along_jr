import { IconCardBlack, IconUserWhite } from "@/assets/icon/Icon";
import { Image, Text, View } from "react-native";

import { ImgWeather } from "@/assets/images";
import IwtButton from "@/lib/buttons/IwtButton";
import tw from "@/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";

const home = () => {
  const route = useRouter();
  return (
    <View style={tw`flex-1 bg-base`}>
      <View style={tw`flex-1 `}>
        <Image source={ImgWeather} resizeMode="contain" />

        <View style={tw`justify-center items-center gap-3 my-8`}>
          <Text style={tw`text-deepBlue text-3xl font-NunitoSansExtraBold`}>
            Book. Drive. Earn
          </Text>
          <Text
            style={tw`text-base text-black font-NunitoSansRegular text-center`}
          >
            Book a ride for your child's destination and start earning as a
            driver on this incredible platform.
          </Text>
        </View>
      </View>
      <View style={tw`px-4 pb-12`}>
        <IwtButton
          title="Need to book a ride for my kid"
          svg={IconUserWhite}
          onPress={async () => {
            await AsyncStorage.setItem("role", "driver");
            route.push("/auth/login");
          }}
        />
        <IwtButton
          title="I'd like to drive"
          svg={IconCardBlack}
          containerStyle={tw`mt-4 bg-deepBlue50 `}
          titleStyle={tw`text-black text-base `}
          onPress={async () => {
            await AsyncStorage.setItem("role", "passenger");
            route.push("/auth/login");
          }}
        />
      </View>
    </View>
  );
};

export default home;

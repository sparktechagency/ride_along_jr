import * as Location from "expo-location";

import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

import { IconSmallYellowLight } from "@/assets/icon/Icon";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";

const name = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  const [name, setName] = useState("");
  const router = useRouter();
  return (
    <View style={tw`bg-[#EFF2F2] flex-1`}>
      <Stack.Screen
        options={{
          statusBarBackgroundColor: "#EFF2F2",
          statusBarAnimation: "fade",
        }}
      />
      <ScrollView contentContainerStyle={tw`py-12`}>
        <View style={tw`px-4 gap-2 justify-center items-center`}>
          <Text
            style={tw`text-4xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
          >
            What’s your name?
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconSmallYellowLight} />
            <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
              Help us to tailor your experience.
            </Text>
          </View>
        </View>
        <View style={tw`px-4 py-12`}>
          <TextInput
            style={tw`rounded-xl bg-white border-0 h-20 text-black text-4xl font-NunitoSansExtraBold px-4`}
            placeholder="Enter your name"
            placeholderTextColor={"#A0A8B6"}
            verticalAlign="middle"
            onChangeText={setName}
            // autoCorrect={true}
            value={name}
          />
        </View>
      </ScrollView>
      <TButton
        title="Next"
        containerStyle={tw`my-5 mx-4`}
        onPress={() => {
          router.push("/passenger");
        }}
      />
    </View>
  );
};

export default name;

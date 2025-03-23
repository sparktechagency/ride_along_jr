import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { IconSmallYellowLight } from "@/assets/icon/Icon";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";

const NameScreen = () => {
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
            style={tw`text-4xl flex-1 text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
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

        {/* Check loading or error states */}

        <>
          <View style={tw`px-4 py-10`}>
            <TextInput
              style={tw`rounded-xl bg-white border-0  text-deepBlue300 text-3xl h-20 font-NunitoSansExtraBold px-4`}
              placeholder="Enter your name"
              placeholderTextColor={"#A0A8B6"}
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <TButton
            title="Next"
            containerStyle={tw`mt-4 mx-4`}
            onPress={() => {
              router.push("/passenger");
            }}
          />
        </>
      </ScrollView>
    </View>
  );
};

export default NameScreen;

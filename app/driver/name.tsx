import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

import { IconSmallYellowLight } from "@/assets/icon/Icon";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

const NameScreen = () => {
  const [name, setName] = useState("");
  const { t } = useTranslation();
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
            {t("driver.name.title")}
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconSmallYellowLight} />
            <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
              {t("driver.name.subtitle")}
            </Text>
          </View>
        </View>

        {/* Check loading or error states */}

        <>
          <View style={tw`px-4 py-10`}>
            <TextInput
              style={tw`rounded-xl bg-white border-0  text-deepBlue300 text-3xl h-20 font-NunitoSansExtraBold px-4`}
              placeholder={t("driver.name.placeholder")}
              placeholderTextColor={"#A0A8B6"}
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>

          <TButton
            title={t("driver.name.nextButton")}
            containerStyle={tw`mt-4 mx-4`}
            onPress={() => {
              router.push("/driver/contact_information");
            }}
          />
        </>
      </ScrollView>
    </View>
  );
};

export default NameScreen;

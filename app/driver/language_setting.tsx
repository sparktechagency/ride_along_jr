import { IconLanguas, IconLanguasEnglish } from "@/assets/icon/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { Checkbox } from "react-native-ui-lib";

const languasSetting = () => {
  const [checkBoxEnglish, setCheckBoxEnglish] = React.useState("english");

  const router = useRouter();
  return (
    <ScrollView>
      <BackWithComponent
        togather
        title={"Language settings"}
        onPress={() => router.back()}
      />
      <View style={tw`items-center my-6 px-9`}>
        <SvgXml style={tw`my-7`} xml={IconLanguas} />
        <Text style={tw`text-2xl font-bold font-NunitoSansRegular`}>
          Select your primary language
        </Text>
      </View>

      <View style={tw`gap-3`}>
        <TouchableOpacity
          onPress={() => {
            setCheckBoxEnglish("english");
          }}
          style={tw` flex-row justify-between bg-white w-[370px] h-24 items-center mx-auto rounded-2xl p-4`}
        >
          <View>
            <Checkbox
              value={checkBoxEnglish === "english"}
              onValueChange={() => {
                setCheckBoxEnglish("english");
              }}
              color={PrimaryColor}
              style={tw`rounded-full w-6 h-6`}
            />
            <Text style={tw`my-1 font-bold text-lg text-[#405658]`}>
              English
            </Text>
          </View>
          <SvgXml xml={IconLanguasEnglish} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCheckBoxEnglish("spanish");
          }}
          style={tw` flex-row justify-between bg-white w-[370px] h-24 items-center mx-auto rounded-2xl px-4`}
        >
          <View>
            <Checkbox
              value={checkBoxEnglish === "spanish"}
              onValueChange={() => {
                setCheckBoxEnglish("spanish");
              }}
              color={PrimaryColor}
              style={tw`rounded-full w-6 h-6`}
            />
            <Text style={tw`my-1 font-bold text-lg text-[#405658]`}>
              Spanish
            </Text>
          </View>
          <SvgXml xml={IconLanguasEnglish} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default languasSetting;

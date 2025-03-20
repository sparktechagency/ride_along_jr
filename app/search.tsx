import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { IconClose } from "@/assets/icon/Icon";
import InputText from "@/lib/inputs/InputText";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const search = () => {
  const router = useRouter();
  return (
    <KeyboardAvoidingView>
      <Pressable style={tw`bg-base rounded-t-2xl`}>
        {/* header parts  */}
        <View style={tw`py-3 `}>
          <View
            style={tw`w-[20%] h-[.4rem] bg-gray-400 rounded-full self-center`}
          />
          <View
            style={tw`px-4 py-4 border-b border-b-gray-200 flex-row items-center  justify-between`}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <SvgXml xml={IconClose} />
            </TouchableOpacity>
            <Text style={tw`text-xl text-deepBlue300 font-NunitoSansBold`}>
              Where you wanna go?
            </Text>
            <View />
          </View>
        </View>
        <View style={tw`my-4 px-4`}>
          {/* search bar  */}
          <InputText placeholder="Search" />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default search;

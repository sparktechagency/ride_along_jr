import { Pressable, TouchableWithoutFeedback, View } from "react-native";

import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";

const search = () => {
  const router = useRouter();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        router.back();
      }}
    >
      <Pressable style={tw`bg-base rounded-t-xl`}>
        {/* header parts  */}
        <View style={tw`py-3`}>
          <View
            style={tw`w-[20%] h-[.4rem] bg-gray-400 rounded-full self-center`}
          />
        </View>
      </Pressable>
    </TouchableWithoutFeedback>
  );
};

export default search;

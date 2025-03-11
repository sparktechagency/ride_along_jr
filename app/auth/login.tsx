import { Text, TouchableOpacity, View } from "react-native";

import { IconEmail } from "@/assets/icon/Icon";
import BackButton from "@/lib/backHeader/BackButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { Checkbox } from "react-native-ui-lib";

const login = () => {
  const router = useRouter();

  const [checkBox, setCheckBox] = React.useState(false);

  return (
    <View style={tw`flex-1 bg-base gap-2`}>
      <BackButton onPress={() => router.back()} />
      <View style={tw`px-4 gap-3 pt-2`}>
        <Text
          style={tw`text-3xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
        >
          Booking a fun ride for your kid
        </Text>

        <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
          Get started by signing up here.
        </Text>
      </View>
      <View style={tw`px-4 gap-4 mt-8`}>
        <View style={tw``}>
          <InputText
            // label="Email"
            svgFirstIcon={IconEmail}
            floatingPlaceholder
            placeholder="Email"
          />
        </View>
        <View style={tw` `}>
          <InputText
            // label="Email"
            svgFirstIcon={IconEmail}
            floatingPlaceholder
            placeholder="Password"
          />
        </View>
      </View>
      <View style={tw`px-4 flex-row items-center mt-5 gap-2 `}>
        <Checkbox
          value={checkBox}
          onValueChange={setCheckBox}
          size={20}
          color={"gray"}
        />
        <TouchableOpacity
          onPress={() => {
            setCheckBox(!checkBox);
          }}
          style={tw`flex-row items-center`}
        >
          <Text style={tw`text-sm font-NunitoSansRegular text-gray-800`}>
            Agree to{" "}
          </Text>
          <Text
            style={tw`text-sm underline font-NunitoSansRegular text-primary`}
          >
            Terms & conditions{" "}
          </Text>
          <Text style={tw`text-sm font-NunitoSansRegular text-gray-800`}>
            and{" "}
          </Text>
          <Text
            style={tw`text-sm underline font-NunitoSansRegular text-primary`}
          >
            Privacy policy.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default login;

import { Text, View } from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import { OtpInput } from "react-native-otp-entry";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const driver_otp_verify = () => {
  const router = useRouter();
  return (
    <View style={tw`flex-1 bg-base `}>
      <BackButton onPress={() => router.back()} />
      <View style={tw`px-4`}>
        <Text
          style={tw`text-4xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
        >
          Enter OTP
        </Text>
        <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
          Enter the PIN code sent to the parent's device.
        </Text>
      </View>
      <View style={tw`px-4 py-12 gap-1`}>
        <OtpInput
          numberOfDigits={4}
          focusColor={PrimaryColor}
          autoFocus={false}
          hideStick={true}
          placeholder="0"
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          // onFocus={() => console.log("Focused")}
          // onBlur={() => console.log("Blurred")}
          // onTextChange={(text) => console.log(text)}
          onFilled={async (text) => {
            console.log(`OTP is ${text}`);
          }}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: tw``,
            pinCodeContainerStyle: tw`h-20 w-20 justify-center items-center  `,
            pinCodeTextStyle: tw`text-deepBlue300 text-5xl font-NunitoSansBold  pt-5`,
            placeholderTextStyle: tw`text-[#D5D7DA] text-5xl font-NunitoSansBold`,
          }}
        />

        <TButton
          onPress={async () => {
            router.push("/driver/trip_done");
          }}
          title="Submit OTP"
          containerStyle={tw`mt-10`}
          titleStyle={tw`font-NunitoSansBold text-base`}
        />
      </View>
    </View>
  );
};

export default driver_otp_verify;

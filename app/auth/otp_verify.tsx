import { Text, View } from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { useRouter } from "expo-router";
import React from "react";
import { OtpInput } from "react-native-otp-entry";

const otp_verify = () => {
  const router = useRouter();
  return (
    <View style={tw`flex-1 bg-base `}>
      <BackButton onPress={() => router.back()} />
      <View style={tw`px-4`}>
        <Text
          style={tw`text-3xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
        >
          Enter OTP
        </Text>
        <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
          Please enter the 4-digit OTP sent to your registered email.
        </Text>
      </View>
      <View style={tw`px-4 py-12`}>
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
          onFocus={() => console.log("Focused")}
          onBlur={() => console.log("Blurred")}
          onTextChange={(text) => console.log(text)}
          onFilled={(text) => console.log(`OTP is ${text}`)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: tw``,
            pinCodeContainerStyle: tw`h-20 w-20  `,
            pinCodeTextStyle: tw`text-deepBlue300 text-5xl font-NunitoSansBold p-0 m-0`,
            placeholderTextStyle: tw`text-[#D5D7DA] text-5xl font-NunitoSansBold p-0 m-0`,
          }}
        />
      </View>
    </View>
  );
};

export default otp_verify;

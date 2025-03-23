import { Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "@/lib/backHeader/BackButton";
import { OtpInput } from "react-native-otp-entry";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const otp_verify = () => {
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
          Please enter the 4-digit OTP sent to your registered email.
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
            const role = await AsyncStorage.getItem("role");
            // console.log(role);
            if (role === "driver") {
            } else {
              router.push("/auth/name");
            }
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
        <View style={tw`flex-row gap-2 mt-5 items-center`}>
          <Text
            style={tw`text-center text-deepBlue300 text-base font-NunitoSansMedium `}
          >
            Didn't receive the OTP?
          </Text>
          <TouchableOpacity onPress={() => console.log("Resend OTP")}>
            <Text
              style={tw`text-center text-primary underline text-sm font-NunitoSansMedium hover:text-deepBlue600 `}
            >
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
        <TButton
          onPress={async () => {
            const role = await AsyncStorage.getItem("role");
            console.log(role);
            if (role === "driver") {
            } else {
              router.push("/auth/name");
            }
          }}
          title="Submit OTP"
          containerStyle={tw`mt-10`}
          titleStyle={tw`font-NunitoSansBold text-base`}
        />
      </View>
    </View>
  );
};

export default otp_verify;

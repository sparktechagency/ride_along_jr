import { Text, View } from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { OtpInput } from "react-native-otp-entry";

const driver_otp_verify = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={tw`flex-1 bg-base `}>
      <BackButton onPress={() => router.back()} />
      <View style={tw`px-4`}>
        <Text
          style={tw`text-4xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
        >
          {t("auth.otp.title")}
        </Text>
        <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
          {t("auth.otp.driverPinDescription")}
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
          title={t("auth.otp.submitOTP")}
          containerStyle={tw`mt-10`}
          titleStyle={tw`font-NunitoSansBold text-base`}
        />
      </View>
    </View>
  );
};

export default driver_otp_verify;

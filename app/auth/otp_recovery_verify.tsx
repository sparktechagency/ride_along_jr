import { Text, TouchableOpacity, View } from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { OtpInput } from "react-native-otp-entry";

const otp_recovery_verify = () => {
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
          {t("auth.otp.pinDescription")}
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
          onFilled={async (text) => {
            console.log(`OTP is ${text}`);
            const role = await AsyncStorage.getItem("role");
            if (role === "driver") {
              router.push("/driver/name");
            } else {
              router.push("/passenger/name");
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
            {t("auth.otp.didntReceive")}
          </Text>
          <TouchableOpacity onPress={() => console.log("Resend OTP")}>
            <Text
              style={tw`text-center text-primary underline text-sm font-NunitoSansMedium hover:text-deepBlue600 `}
            >
              {t("auth.otp.resendCode")}
            </Text>
          </TouchableOpacity>
        </View>
        <TButton
          onPress={async () => {
            const role = await AsyncStorage.getItem("role");
            console.log(role);
            if (role === "driver") {
            } else {
              router.push("/auth/create_new_pass");
            }
          }}
          title={t("auth.otp.submitOTP")}
          containerStyle={tw`mt-10`}
          titleStyle={tw`font-NunitoSansBold text-base`}
        />
      </View>
    </View>
  );
};

export default otp_recovery_verify;

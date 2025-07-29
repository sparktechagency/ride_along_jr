import { Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "@/lib/backHeader/BackButton";
import { OtpInput } from "react-native-otp-entry";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import TButton from "@/lib/buttons/TButton";
import Toast from "react-native-toast-message";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useTranslation } from "react-i18next";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/apiSlices/authApiSlices";

const otp_verify = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const params = useSearchParams();
  const email = params?.get("email") || "";
  const [VerifyOtp, optResult] = useVerifyOtpMutation();
  const [sendOtp, sendOtpResult] = useSendOtpMutation();

  const handleResendOtp = async () => {
    try {
      await sendOtp({ email });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "OTP has been resent to your email",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to resend OTP. Please try again.",
      });
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      console.log("handleVerifyOtp otp", otp);
      console.log("handleVerifyOtp email", email);
      const requestData = {
        email: email, // Make sure this matches exactly what backend expects
        emailVerifyCode: otp, // Some backends expect 'code' instead of 'otp'
      };
      const response = await VerifyOtp(requestData).unwrap();

      console.log("handleVerifyOtp response", response);

      if (response?.success) {
        const role = await AsyncStorage.getItem("role");
        if (role === "driver") {
          router.push("/driver/name");
        } else {
          router.push("/passenger/name");
        }
      }
    } catch (error) {
      console.warn("verify otp failed:", error);
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: (error as any)?.message,
      });
    }
  };

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
          {t("auth.otp.description")}
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
            handleVerifyOtp(text);
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
            {t("auth.otp.enterOTP")}
          </Text>
          <TouchableOpacity
            onPress={handleResendOtp}
            disabled={sendOtpResult.isLoading}
          >
            <Text
              style={[
                tw`text-center text-primary underline text-sm font-NunitoSansMedium hover:text-deepBlue600`,
                sendOtpResult.isLoading && tw`opacity-50`,
              ]}
            >
              {t("auth.otp.resendCode")}
            </Text>
          </TouchableOpacity>
        </View>
        <TButton
          onPress={async () => {
            // const role = await AsyncStorage.getItem("role");
            // console.log(role);
            // if (role === "driver") {
            //   router.push("/driver/name");
            // } else {
            //   router.push("/passenger/name");
            // }
            router.push("/auth/location");
          }}
          title={t("auth.otp.verify")}
          containerStyle={tw`mt-10`}
          titleStyle={tw`font-NunitoSansBold text-base`}
        />
      </View>
    </View>
  );
};

export default otp_verify;

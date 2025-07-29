import {
  IconCloseEye,
  IconEmail,
  IconLock,
  IconOpenEye,
  IconSmallRightTick,
} from "@/assets/icon/Icon";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";

import BackButton from "@/lib/backHeader/BackButton";
import Checkbox from "expo-checkbox";
import { Formik } from "formik";
import InputText from "@/lib/inputs/InputText";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import TButton from "@/lib/buttons/TButton";
import Toast from "react-native-toast-message";
import tw from "@/lib/tailwind";
import { useSignUpMutation } from "@/redux/apiSlices/authApiSlices";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
const register = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [SignUp, signUpResult] = useSignUpMutation();

  const [checkBox, setCheckBox] = React.useState(false);
  const [IsShow, setIsShow] = React.useState(false);

  const handleSignUp = async (values: any) => {
    try {
      // console.log("SignUp values:", values);
      const res = await SignUp({
        email: values.email,
        password: values.password,
      }).unwrap();
      if (res?.success) {
        await AsyncStorage.setItem("user", JSON.stringify(res?.data?.newUser));
        await AsyncStorage.setItem("token", res?.data?.token);
        router.push(`/auth/otp_verify?email=${values.email}`);
      }
      // router.push("/auth/login");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: (error as any)?.message,
      });
    }
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={tw`flex-1 bg-base gap-2`}>
      <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-10`}
        >
          <BackButton onPress={() => router.back()} />
          <View style={tw`px-4 gap-5 pt-2`}>
            <Text
              style={tw`text-4xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
            >
              {t("auth.register.createAccount")}
            </Text>

            <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
              {t("auth.register.getStarted")}
            </Text>
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {} as any;
              if (!values.email) {
                errors.email = t("auth.login.emailRequired");
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = t("auth.login.invalidEmail");
              }
              if (!values.password) {
                errors.password = t("auth.login.passwordRequired");
              } else if (values.password.length < 8) {
                errors.password = t("auth.login.passwordLength");
              }
              return errors;
            }}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <View style={tw`px-4 gap-5 mt-8`}>
                  <View style={tw``}>
                    <InputText
                      value={values.email}
                      onBlur={handleBlur("email")}
                      onChangeText={handleChange("email")}
                      errorText={errors.email}
                      textXValue={-36}
                      placeholder={t("auth.register.email")}
                      svgFirstIcon={IconEmail}
                      svgSecondIcon={
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                          ? ""
                          : IconSmallRightTick
                      }
                      focusSTyle={tw`border border-primary`}
                    />
                  </View>
                  <View style={tw``}>
                    <InputText
                      placeholder={t("auth.register.password")}
                      textInputProps={{
                        secureTextEntry: !IsShow,
                      }}
                      onBlur={handleBlur("password")}
                      onChangeText={handleChange("password")}
                      value={values.password}
                      svgFirstIcon={IconLock}
                      errorText={errors.password}
                      svgSecondIcon={IsShow ? IconOpenEye : IconCloseEye}
                      focusSTyle={tw`border border-primary`}
                      svgSecondOnPress={() => {
                        setIsShow(!IsShow);
                      }}
                    />
                  </View>
                </View>

                <View style={tw`flex-1 px-4 flex-row items-center mt-8 gap-2 `}>
                  <Checkbox
                    value={checkBox}
                    onValueChange={setCheckBox}
                    color={PrimaryColor}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setCheckBox(!checkBox);
                    }}
                    style={tw`flex-1 flex-row items-center flex-wrap`}
                  >
                    <Text
                      style={tw`text-sm font-NunitoSansRegular text-gray-800`}
                    >
                      {t("auth.register.termsText")}{" "}
                    </Text>
                    <Link
                      href={"/terms_and_conditions"}
                      style={tw`text-sm underline font-NunitoSansRegular text-primary`}
                    >
                      {t("auth.register.termsLink")}{" "}
                    </Link>
                    <Text
                      style={tw`text-sm font-NunitoSansRegular text-gray-800`}
                    >
                      {t("auth.register.and")}{" "}
                    </Text>
                    <Link
                      href={"/privacy_policy"}
                      style={tw`text-sm underline font-NunitoSansRegular text-primary`}
                    >
                      {t("auth.register.privacyLink")}
                    </Link>
                  </TouchableOpacity>
                </View>
                <View style={tw`px-4 mt-5 gap-5`}>
                  <TButton
                    disabled={!checkBox}
                    isLoading={signUpResult.isLoading}
                    title={t("auth.register.createAccountButton")}
                    onPress={() => {
                      handleSubmit();
                      // router.push("/auth/otp_verify");
                    }}
                  />
                  {/* <IwtButton
                    svg={IconGoogleIcon}
                    title={t("auth.login.continueWithGoogle")}
                    containerStyle={tw`bg-[#E8EAED] `}
                    titleStyle={tw`text-black`}
                  /> */}
                </View>
              </>
            )}
          </Formik>

          <View style={tw`flex-row gap-2 justify-center mt-7`}>
            <Text style={tw`text-sm font-NunitoSansRegular text-gray-900`}>
              {t("auth.register.haveAccount")}
            </Text>
            <Link
              href={"/auth/login"}
              style={tw`text-sm font-NunitoSansRegular text-primary underline`}
            >
              {t("auth.register.loginLink")}
            </Link>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default register;

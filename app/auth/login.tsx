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

import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "@/lib/backHeader/BackButton";
import Checkbox from "expo-checkbox";
import { Formik } from "formik";
import InputText from "@/lib/inputs/InputText";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import TButton from "@/lib/buttons/TButton";
import Toast from "react-native-toast-message";
import tw from "@/lib/tailwind";
import { useLoginMutation } from "@/redux/apiSlices/authApiSlices";
import { useTranslation } from "react-i18next";

const login = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [Login, loginResult] = useLoginMutation();
  const [loginInfo, setLoginInfo] = React.useState({ email: "", password: "" });

  const [checkBox, setCheckBox] = React.useState(false);
  const [IsShow, setIsShow] = React.useState(false);

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const handleSignIn = async (values: any) => {
    try {
      const response = await Login({
        email: values.email,
        password: values.password,
      }).unwrap();
      // console.log("Login response:", response);
      console.log("response", response);
      if (response?.data?.token) {
        await AsyncStorage.setItem("token", response?.data?.token);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response?.data?.user)
        );

        console.log("user------", response?.data?.user);

        if (checkBox) {
          values.check = true;
          await AsyncStorage.setItem("loginInfo", JSON.stringify(values));
        } else {
          values.check = false;
          await AsyncStorage.removeItem("loginInfo");
        }
        const role = await AsyncStorage.getItem("role");
        // router.push("/auth/otp_verify");
        if (role === "passenger") {
          router.push("/passenger/drawer/home");
        } else {
          router.push("/driver/drawer/home");
        }
      }
    } catch (error) {
      console.warn("Login failed:", error);
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: (error as any)?.message,
      });
    }
  };
  const fetchLoginInfo = async () => {
    const storedLoginInfo = await AsyncStorage.getItem("loginInfo");
    if (storedLoginInfo) {
      const parsedLoginInfo = JSON.parse(storedLoginInfo);
      setLoginInfo(parsedLoginInfo);
      setCheckBox(parsedLoginInfo.check);
    }
  };

  React.useEffect(() => {
    fetchLoginInfo();
  }, []);

  return (
    <TouchableWithoutFeedback
      style={tw`flex-1`}
      onPress={handleKeyboardDismiss}
    >
      <View style={tw` bg-base gap-2`}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-10`}
        >
          <BackButton
            onPress={() =>
              router.canGoBack() ? router.back() : router.push("/welcome")
            }
          />

          <View style={tw`px-4 gap-5 pt-2`}>
            <Text
              style={tw`text-4xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
            >
              {t("auth.login.welcome")}
            </Text>

            <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
              {t("auth.login.getStarted")}
            </Text>
          </View>
          <Formik
            initialValues={{
              email: loginInfo.email || "",
              password: loginInfo.password || "",
            }}
            revalidateOnMount={true}
            enableReinitialize={true}
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
            onSubmit={handleSignIn}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={tw`px-4 gap-5 mt-8  `}>
                  <View style={tw``}>
                    <InputText
                      value={values.email}
                      onBlur={handleBlur("email")}
                      onChangeText={handleChange("email")}
                      errorText={errors.email}
                      touched={touched.email}
                      textXValue={-36}
                      placeholder={t("auth.login.email")}
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
                      placeholder={t("auth.login.password")}
                      textInputProps={{
                        secureTextEntry: !IsShow,
                      }}
                      touched={touched.password}
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
                {/* <View style={tw`px-4 mt-5 gap-2`}>
                  {loginResult?.error && (
                    <View style={tw`flex-row items-center gap-1`}>
                      <SvgXml
                        xml={`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#ee404c" d="M57.362 26.54 20.1 91.075a7.666 7.666 0 0 0 6.639 11.5h74.518a7.666 7.666 0 0 0 6.639-11.5L70.638 26.54a7.665 7.665 0 0 0-13.276 0z" opacity="1" data-original="#ee404c" class=""></path><g fill="#fff7ed"><rect width="9.638" height="29.377" x="59.181" y="46.444" rx="4.333" fill="#fff7ed" opacity="1" data-original="#fff7ed" class=""></rect><circle cx="64" cy="87.428" r="4.819" fill="#fff7ed" opacity="1" data-original="#fff7ed" class=""></circle></g></g></svg>`}
                      />
                      <Text style={tw`text-red-500 text-sm`}>
                        {loginResult.error?.message ||
                          t("auth.login.loginFailed")}
                      </Text>
                    </View>
                  )}
                </View> */}
                <View style={tw`self-end mt-3 px-4`}>
                  <Link
                    href={"/auth/forgot_password"}
                    style={tw`text-sm font-NunitoSansBold text-primary underline`}
                  >
                    {t("auth.login.forgotPassword")}
                  </Link>
                </View>
                <View style={tw`px-4 flex-row items-center mt-5 gap-2 `}>
                  <Checkbox
                    value={checkBox}
                    onValueChange={setCheckBox}
                    color={PrimaryColor}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setCheckBox(!checkBox);
                    }}
                    style={tw`flex-row items-center`}
                  >
                    <Text
                      style={tw`text-sm font-NunitoSansRegular text-gray-800`}
                    >
                      {t("auth.login.rememberMe")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={tw`px-4 mt-5 gap-5`}>
                  <TButton
                    isLoading={loginResult.isLoading}
                    title={t("auth.login.loginButton")}
                    onPress={async () => {
                      handleSubmit();
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
              {t("auth.login.noAccount")}
            </Text>
            <Link
              href={"/auth/register"}
              style={tw`text-sm font-NunitoSansRegular text-primary underline`}
            >
              {t("auth.login.signUp")}
            </Link>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default login;

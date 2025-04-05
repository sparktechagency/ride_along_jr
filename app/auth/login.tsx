import {
  IconCloseEye,
  IconEmail,
  IconGoogleIcon,
  IconLock,
  IconOpenEye,
  IconSmallRightTick,
} from "@/assets/icon/Icon";
import { Link, useRouter } from "expo-router";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import IwtButton from "@/lib/buttons/IwtButton";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "react-native-ui-lib";

const login = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [checkBox, setCheckBox] = React.useState(false);
  const [IsShow, setIsShow] = React.useState(false);

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
              {t("auth.login.welcome")}
            </Text>

            <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
              {t("auth.login.getStarted")}
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
            onSubmit={(values) => {
              console.log(values);
            }}
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
                <View style={tw`px-4 gap-5 mt-8`}>
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
                    size={20}
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
                    title={t("auth.login.loginButton")}
                    onPress={async () => {
                      const role = await AsyncStorage.getItem("role");
                      // handleSubmit
                      // router.push("/auth/otp_verify");
                      if (role === "passenger") {
                        router.push("/passenger/drawer/home");
                      } else {
                        router.push("/driver/drawer/home");
                      }
                    }}
                  />
                  <IwtButton
                    svg={IconGoogleIcon}
                    title={t("auth.login.continueWithGoogle")}
                    containerStyle={tw`bg-[#E8EAED] `}
                    titleStyle={tw`text-black`}
                  />
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
      </TouchableWithoutFeedback>
    </View>
  );
};

export default login;

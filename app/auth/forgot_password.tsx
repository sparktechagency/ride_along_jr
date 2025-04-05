import { IconEmail, IconSmallRightTick } from "@/assets/icon/Icon";
import { Keyboard, Text, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import BackButton from "@/lib/backHeader/BackButton";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

const forgot_password = () => {
  const router = useRouter();
  const { t } = useTranslation();

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
              {t("auth.forgotPassword.title")}
            </Text>

            <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
              {t("auth.forgotPassword.description")}
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
              return errors;
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, values, errors, touched }) => (
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
                      placeholder={t("auth.forgotPassword.email")}
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
                </View>

                <View style={tw`px-4 mt-5 gap-5`}>
                  <TButton
                    title={t("auth.forgotPassword.sendInstructions")}
                    onPress={() => {
                      router.push("/auth/otp_recovery_verify");
                    }}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default forgot_password;

import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";

import { IconSmallYellowLight } from "@/assets/icon/Icon";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import { useUpdateProfileMutation } from "@/redux/apiSlices/authApiSlices";
import Toast from "react-native-toast-message";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NameScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const [updateProfile] = useUpdateProfileMutation();

  const handleSubmit = async (values: { name: string }) => {
    try {
      setIsSubmitting(true);
      console.log("handleSubmit values:", values);
      console.log("handleSubmit values name:", values.name);
      const formData = new FormData();
      formData.append("name", values.name);

      const response = await updateProfile(formData).unwrap();
      console.log("handleSubmit response:", response);

      if (response?.success) {
        await AsyncStorage.setItem("user", JSON.stringify(response?.data));
        Toast.show({
          type: "success",
          text1: t("common.success"),
          text2: t("passenger.name.updateSuccess"),
        });
        router.push("/passenger/drawer/home");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: error?.data?.message || t("common.somethingWentWrong"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={tw`bg-[#EFF2F2] flex-1`}>
      <Stack.Screen
        options={{
          statusBarBackgroundColor: "#EFF2F2",
          statusBarAnimation: "fade",
        }}
      />
      <ScrollView contentContainerStyle={tw`py-12`}>
        <View style={tw`px-4 gap-2 justify-center items-center`}>
          <Text
            style={tw`text-4xl flex-1 text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
          >
            {t("passenger.name.title")}
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconSmallYellowLight} />
            <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
              {t("passenger.name.subtitle")}
            </Text>
          </View>
        </View>

        <Formik
          initialValues={{ name: "" }}
          onSubmit={handleSubmit}
          validate={(values) => {
            const errors: { name?: string } = {};
            if (!values.name.trim()) {
              errors.name = t("auth.login.nameRequired");
            }
            return errors;
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
              <View style={tw`px-4 py-10`}>
                <TextInput
                  style={[
                    tw`rounded-xl bg-white text-deepBlue300 text-3xl h-20 font-NunitoSansExtraBold px-4`,
                    errors.name && tw`border border-red-500`,
                  ]}
                  placeholder={t("passenger.name.placeholder")}
                  placeholderTextColor={"#A0A8B6"}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {touched.name && errors.name && (
                  <Text style={tw`text-red-500 text-sm mt-1 px-2`}>
                    {errors.name}
                  </Text>
                )}
              </View>

              <TButton
                title={
                  isSubmitting
                    ? t("common.saving")
                    : t("passenger.name.nextButton")
                }
                containerStyle={tw`mt-4 mx-4`}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              />

              {isSubmitting && (
                <View style={tw`mt-4`}>
                  <ActivityIndicator size="small" color="#0000ff" />
                </View>
              )}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default NameScreen;

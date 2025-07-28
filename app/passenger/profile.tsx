import {
  IconCamera,
  IconCloseEye,
  IconEdit,
  IconEmail,
  IconLock,
  IconOpenEye,
  IconProfile,
  IconSmallRightTick,
} from "@/assets/icon/Icon";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { usePickImage } from "@/hook/usePickImage";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IwtButton from "@/lib/buttons/IwtButton";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import { useBottomModal } from "@/lib/modals/BottomModalHook";
import tw from "@/lib/tailwind";
import { HIGHT } from "@/utils/utils";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import { useGetProfileQuery } from "@/redux/apiSlices/authApiSlices";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

interface ProfileData {
  email: string;
  username: string;
  // Add other fields from the API response as needed
}

const profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [IsShow, setIsShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const { data, error, isLoading, refetch } = useGetProfileQuery({});

  useEffect(() => {
    if (data?.success && data.data) {
      setProfileData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load profile data",
      });
    }
  }, [error]);

  const { BottomModal, close, open } = useBottomModal();

  return (
    <View style={tw`flex-1 bg-base gap-2`}>
      <BackWithComponent
        togather
        onPress={() => {
          router?.back();
        }}
        title={t("driver.profile.accountSettings")}
      />
      <ScrollView contentContainerStyle={tw` pb-6 `}>
        <View style={tw`items-center my-12 `}>
          <View style={tw`relative`}>
            <Image
              style={tw`mb-6 w-24 h-24 rounded-full`}
              source={
                image
                  ? { uri: image }
                  : require("@/assets/images/Ellipse118.png")
              }
            />
            <TouchableOpacity
              onPress={async () => {
                const image = await usePickImage();
                setImage(image);
              }}
            >
              <SvgXml
                xml={IconCamera}
                style={tw`absolute bottom-6 -right-0 bg-base p-4 rounded-full`}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={tw`text-2xl font-bold mb-1 text-black font-NunitoSansRegular`}
          >
            Lana Yolo
          </Text>
          <Text style={tw`text-md  mb-1 text-black font-NunitoSansRegular`}>
            {profileData?.email}
          </Text>
          {/* <Text style={tw`text-sm font-semibold font-NunitoSansRegular`}>
            ID: 05745
          </Text> */}
        </View>

        <View style={tw`w-[370px]  mx-auto rounded-2xl shadow-md bg-white `}>
          <Text
            style={tw`text-2xl mt-5 ml-4 font-bold text-[#172B4D] font-NunitoSansRegular`}
          >
            {t("driver.profile.personalInformation")}
          </Text>
          <Formik
            initialValues={{
              name: profileData?.username || "",
              email: profileData?.email || "",
            }}
            enableReinitialize
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
            onSubmit={async (values) => {
              try {
                console.log("Updating profile with:", values);
                // Here you would typically call an update profile mutation
                // await updateProfile(values).unwrap();
                Toast.show({
                  type: "success",
                  text1: "Success",
                  text2: "Profile updated successfully",
                });
                setIsEdit(false);
                refetch(); // Refresh profile data
              } catch (error) {
                console.error("Error updating profile:", error);
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Failed to update profile",
                });
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              handleSubmit,
            }) => (
              <>
                <View style={tw`px-4 gap-5 mt-8`}>
                  <View style={tw`w-full`}>
                    <InputText
                      value={values.name}
                      onBlur={handleBlur("name")}
                      placeholderStyle={tw`bg-white`}
                      onChangeText={handleChange("name")}
                      errorText={errors.name}
                      touched={touched.name}
                      textXValue={-36}
                      // textInputProps={{
                      //   placeholder: "Enter your name",
                      // }}
                      placeholder={t("driver.profile.name")}
                      svgFirstIcon={IconProfile}
                      focusSTyle={tw`border border-primary`}
                    />
                  </View>
                  <TButton
                    title={t("driver.profile.saveChanges")}
                    containerStyle={tw`bg-primary`}
                    titleStyle={tw`text-white`}
                    onPress={() => {
                      handleSubmit();
                    }}
                  />
                </View>
                <View style={tw`px-4 flex-row items-center mt-5 gap-2 `}>
                  <TouchableOpacity
                    onPress={() => {
                      setCheckBox(!checkBox);
                    }}
                    style={tw`flex-row items-center`}
                  >
                    <Text
                      style={tw`text-xl font-bold font-NunitoSansRegular text-gray-800`}
                    >
                      {t("driver.profile.accountSettings")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={tw`pb-8`}>
                  <TouchableOpacity style={tw`px-4 mt-5 gap-5`}>
                    <TButton
                      title={t("driver.profile.changePassword")}
                      containerStyle={tw`bg-[#E8EAED] `}
                      titleStyle={tw`text-[#5C7B7E]`}
                      onPress={() => {
                        open();
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>

      {/* ============= Modal for Updating Password =============== */}

      <BottomModal _height={HIGHT * 0.4}>
        <View style={tw` bg-black bg-opacity-50 justify-center items-center`}>
          <View style={tw`w-full bg-white py-5  shadow-lg`}>
            <Text
              style={tw`px-4 text-2xl font-bold text-[#172B4D] font-NunitoSansRegular`}
            >
              {t("driver.profile.changePassword")}
            </Text>
            <Formik
              initialValues={{ password: "" }}
              validate={(values) => {
                const errors = {} as any;
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
              {({ handleChange, handleBlur, values, errors, touched }) => (
                <>
                  <View style={tw`px-4 gap-5 mt-8`}>
                    <View style={tw``}>
                      <InputText
                        placeholder={t("auth.newPassword.newPassword")}
                        textInputProps={{
                          secureTextEntry: !IsShow,
                        }}
                        placeholderStyle={tw`bg-white`}
                        touched={touched.password}
                        onBlur={handleBlur("password")}
                        onChangeText={handleChange("password")}
                        value={values.password}
                        svgFirstIcon={IconLock}
                        errorText={errors.password}
                        focusSTyle={tw`border border-primary`}
                        svgSecondOnPress={() => {
                          setIsShow(!IsShow);
                        }}
                      />
                    </View>
                    <View style={tw``}>
                      <InputText
                        placeholder={t("auth.newPassword.confirmPassword")}
                        textInputProps={{
                          secureTextEntry: !IsShow,
                        }}
                        placeholderStyle={tw`bg-white`}
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

                  <View style={tw`px-4 mt-14 gap-5`}>
                    <TButton
                      title={t("auth.newPassword.saveChanges")}
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </BottomModal>
    </View>
  );
};

export default profile;

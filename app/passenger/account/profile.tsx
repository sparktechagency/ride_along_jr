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
import { Image, Text, TouchableOpacity, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { Formik } from "formik";
import InputText from "@/lib/inputs/InputText";
import React from "react";
import SideModal from "@/lib/modals/SideModal";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const profile = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [checkBox, setCheckBox] = React.useState(false);
  const [IsShow, setIsShow] = React.useState(false);
  const router = useRouter();

  return (
    <View style={tw`flex-1 bg-base gap-2`}>
      <BackWithComponent
        togather
        onPress={() => {
          router?.back();
        }}
        title={"Account & security"}
        ComponentBtn={
          <View>
            <Text style={tw`text-[#5C7B7E] text-base font-normal`}>
              Edit <SvgXml xml={IconEdit} />{" "}
            </Text>
          </View>
        }
      />
      <View style={tw`items-center my-12 `}>
        <View style={tw`relative`}>
          <Image
            style={tw`mb-6 w-24 h-24`}
            source={require("../../../assets/images/Ellipse118.png")}
          />
          <SvgXml
            xml={IconCamera}
            style={tw`absolute bottom-7 right-1 bg-base p-4 rounded-full`}
          />
        </View>
        <Text
          style={tw`text-2xl font-bold mb-1 text-black font-NunitoSansRegular`}
        >
          Lana Yolo
        </Text>
        <Text style={tw`text-sm font-semibold font-NunitoSansRegular`}>
          ID: 05745
        </Text>
      </View>

      <View style={tw`w-[370px]  mx-auto rounded-2xl shadow-md bg-white `}>
        <Text
          style={tw`text-2xl mt-5 ml-4 font-bold text-[#172B4D] font-NunitoSansRegular`}
        >
          General Information
        </Text>
        <Formik
          initialValues={{ name: "", email: "" }}
          validate={(values) => {
            const errors = {} as any;
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address. Please try again. ";
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
                    value={values.name}
                    onBlur={handleBlur("name")}
                    onChangeText={handleChange("name")}
                    errorText={errors.name}
                    touched={touched.name}
                    textXValue={-36}
                    placeholder="Name"
                    svgFirstIcon={IconProfile}
                    focusSTyle={tw`border border-primary`}
                  />
                </View>
                <View style={tw``}>
                  <InputText
                    value={values.email}
                    onBlur={handleBlur("email")}
                    onChangeText={handleChange("email")}
                    errorText={errors.email}
                    touched={touched.email}
                    textXValue={-36}
                    placeholder="Email"
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
                    Security
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={tw`pb-8`}>
                <TouchableOpacity style={tw`px-4 mt-5 gap-5`}>
                  <TButton
                    title="Update Password"
                    containerStyle={tw`bg-[#E8EAED] `}
                    titleStyle={tw`text-[#5C7B7E]`}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>

      {/* ============= Modal for Updating Password =============== */}

      <SideModal visible={modalVisible} setVisible={setModalVisible}>
        <View style={tw` bg-black bg-opacity-50 justify-center items-center`}>
          <View style={tw`w-full bg-white py-5  shadow-lg`}>
            <Text
              style={tw`text-2xl font-bold text-[#172B4D] font-NunitoSansRegular`}
            >
              Update Password
            </Text>
            <Formik
              initialValues={{ password: "" }}
              validate={(values) => {
                const errors = {} as any;
                if (!values.password) {
                  errors.password = "Required";
                } else if (values.password.length < 8) {
                  errors.password =
                    "Password must be at least 8 characters long";
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
                        placeholder="Password"
                        textInputProps={{
                          secureTextEntry: !IsShow,
                        }}
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
                        placeholder="Confirm Password"
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

                  <View style={tw`px-4 mt-14 gap-5`}>
                    <TButton
                      title="Save & Change"
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </SideModal>
    </View>
  );
};

export default profile;

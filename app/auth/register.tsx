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
import { Formik } from "formik";
import React from "react";
import { Checkbox } from "react-native-ui-lib";

const register = () => {
  const router = useRouter();

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
              style={tw`text-3xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
            >
              Booking a fun ride for your kid
            </Text>

            <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
              Get started by signing up here.
            </Text>
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {} as any;
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 8) {
                errors.password = "Password must be at least 8 characters long";
              }
              return errors;
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
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
                  <View style={tw``}>
                    <InputText
                      placeholder="Password"
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
                      Agree to{" "}
                    </Text>
                    <Link
                      href={"/terms_and_conditions"}
                      style={tw`text-sm underline font-NunitoSansRegular text-primary`}
                    >
                      Terms & conditions{" "}
                    </Link>
                    <Text
                      style={tw`text-sm font-NunitoSansRegular text-gray-800`}
                    >
                      and{" "}
                    </Text>
                    <Link
                      href={"/privacy_policy"}
                      style={tw`text-sm underline font-NunitoSansRegular text-primary`}
                    >
                      Privacy policy.
                    </Link>
                  </TouchableOpacity>
                </View>
                <View style={tw`px-4 mt-5 gap-5`}>
                  <TButton title="Sign up" onPress={handleSubmit} />
                  <IwtButton
                    svg={IconGoogleIcon}
                    title="Continue with google"
                    containerStyle={tw`bg-[#E8EAED] `}
                    titleStyle={tw`text-black`}
                  />
                </View>
              </>
            )}
          </Formik>

          <View style={tw`flex-row gap-2 justify-center mt-7`}>
            <Text style={tw`text-sm font-NunitoSansRegular text-gray-900`}>
              Already have an account?
            </Text>
            <Link
              href={"/auth/login"}
              style={tw`text-sm font-NunitoSansRegular text-primary underline`}
            >
              Login
            </Link>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default register;

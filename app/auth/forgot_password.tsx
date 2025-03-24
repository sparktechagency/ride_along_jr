import { View, Text, Keyboard } from 'react-native'
import React from 'react'
import tw from '@/lib/tailwind'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import BackButton from '@/lib/backHeader/BackButton'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import InputText from '@/lib/inputs/InputText'
import { IconEmail, IconSmallRightTick } from '@/assets/icon/Icon'
import TButton from '@/lib/buttons/TButton'

const forgot_password = () => {
    const router = useRouter();


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
            Forgot password?
          </Text>

          <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
          Don’t worry, we’ve got you covered. Enter your registered email address and we’ll send you a OTP to reset your password.
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
              errors.email = "Invalid email address. Please try again. ";
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
              
              <View style={tw`px-4 mt-5 gap-5`}>
                <TButton
                  title="Get OTP"
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
  )
}

export default forgot_password
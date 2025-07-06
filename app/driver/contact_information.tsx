import {
  IconCallOnly,
  IconLocationOnly,
  IconMapOnly,
} from "@/assets/icon/Icon";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import { Formik } from "formik";
import InputText from "@/lib/inputs/InputText";
import React from "react";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const contact_information = () => {
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
              {t("driver.contactInfo.title")}
            </Text>
          </View>
          <Formik
            initialValues={{ contact: "", address: "", city: "" }}
            validate={(values) => {
              const errors = {} as any;
              if (errors.contact) {
                errors.contact = t("auth.login.emailRequired");
              }
              if (errors.address) {
                errors.address = t("auth.login.emailRequired");
              }
              if (errors.city) {
                errors.city = t("auth.login.emailRequired");
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
                      value={values.contact}
                      onBlur={handleBlur("contact}")}
                      onChangeText={handleChange("contact}")}
                      errorText={errors.contact}
                      touched={touched.contact}
                      // textXValue={-36}
                      placeholder={t("driver.contactInfo.contactNumber")}
                      svgFirstIcon={IconCallOnly}
                      focusSTyle={tw`border border-primary`}
                    />
                  </View>
                  <View style={tw``}>
                    <InputText
                      placeholder={t("driver.contactInfo.address")}
                      touched={touched.address}
                      onBlur={handleBlur("address")}
                      onChangeText={handleChange("address")}
                      value={values.address}
                      svgFirstIcon={IconLocationOnly}
                      errorText={errors.address}
                      focusSTyle={tw`border border-primary`}
                    />
                  </View>
                  <View style={tw``}>
                    <InputText
                      placeholder={t("driver.contactInfo.city")}
                      touched={touched.city}
                      onBlur={handleBlur("city")}
                      onChangeText={handleChange("city")}
                      value={values.city}
                      svgFirstIcon={IconMapOnly}
                      errorText={errors.city}
                      focusSTyle={tw`border border-primary`}
                    />
                  </View>
                </View>
                <View style={tw`px-4 py-8`}>
                  <TButton
                    onPress={() => {
                      router?.push("/driver/passport_submit");
                    }}
                    title={t("driver.contactInfo.nextButton")}
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

export default contact_information;

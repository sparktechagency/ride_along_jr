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

const contact_information = () => {
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
              style={tw`text-4xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
            >
              Enter your contact information
            </Text>
          </View>
          <Formik
            initialValues={{ contact: "", address: "", city: "" }}
            validate={(values) => {
              const errors = {} as any;
              if (errors.contact) {
                errors.contact = "Required";
              }
              if (errors.address) {
                errors.address = "Required";
              }
              if (errors.city) {
                errors.city = "Required";
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
                      placeholder="Contact number"
                      svgFirstIcon={IconCallOnly}
                      focusSTyle={tw`border border-primary`}
                    />
                  </View>
                  <View style={tw``}>
                    <InputText
                      placeholder="Your address"
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
                      placeholder="City you drive in"
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
                    title="Next 2/6"
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

import * as ImagePicker from "expo-image-picker";

import {
  IconDelete,
  IconUploadSmall,
  IconVehicleOnly,
} from "@/assets/icon/Icon";
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import { Formik } from "formik";
import InputText from "@/lib/inputs/InputText";
import React from "react";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import { bytesToMB } from "@/utils/utils";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const vehicle_information = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [checkBox, setCheckBox] = React.useState(false);
  const [IsShow, setIsShow] = React.useState(false);

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      return result;
    } else {
      console.log("cancelled");
    }
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
              {t("driver.vehicleInfo.title")}
            </Text>
          </View>
          <Formik
            initialValues={{ name: "", year: "", number: "", image: [] }}
            validate={(values) => {
              const errors = {} as any;
              if (errors.name) {
                errors.name = t("auth.login.emailRequired");
              }
              if (errors.year) {
                errors.year = t("auth.login.emailRequired");
              }
              if (errors.number) {
                errors.number = t("auth.login.emailRequired");
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
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={tw`px-4 gap-5 mt-8`}>
                  <View style={tw``}>
                    <InputText
                      value={values.name}
                      onBlur={handleBlur("name}")}
                      onChangeText={handleChange("name}")}
                      errorText={errors.name}
                      touched={touched.name}
                      // textXValue={-36}
                      placeholder={t("driver.vehicleInfo.vehicleModel")}
                      svgFirstIcon={IconVehicleOnly}
                      focusSTyle={tw`border border-primary`}
                    />
                  </View>
                  <View style={tw``}>
                    <InputText
                      placeholder={t("driver.vehicleInfo.vehicleYear")}
                      touched={touched.year}
                      onBlur={handleBlur("year")}
                      onChangeText={handleChange("year")}
                      value={values.year}
                      textXOutRangeFirst={10}
                      textXOutRangeSecond={10}
                      errorText={errors.year}
                      focusSTyle={tw`border border-primary`}
                    />
                  </View>
                  <View style={tw``}>
                    <InputText
                      placeholder={t("driver.vehicleInfo.licensePlate")}
                      touched={touched.number}
                      onBlur={handleBlur("number")}
                      onChangeText={handleChange("number")}
                      value={values.number}
                      textXOutRangeFirst={-4}
                      textXOutRangeSecond={10}
                      errorText={errors.number}
                      focusSTyle={tw`border border-primary`}
                    />
                  </View>
                </View>

                <View style={tw`px-4 my-8`}>
                  <TouchableOpacity
                    onPress={async () => {
                      const result = await pickImage();
                      //   console.log(result);
                      if (result) {
                        setFieldValue("image", [
                          ...values?.image,
                          ...result.assets,
                        ]);
                      }
                    }}
                    style={tw`flex-row gap-3 p-3 border border-gray-400 rounded-lg border-dashed items-center justify-center`}
                  >
                    <>
                      <SvgXml xml={IconUploadSmall} />
                      <Text
                        style={tw`text-gray-600 text-base font-NunitoSansRegular`}
                      >
                        Upload Car photo's
                      </Text>
                    </>
                  </TouchableOpacity>
                </View>

                <View style={tw`px-4`}>
                  {values.image.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={tw`flex-row  gap-3 p-3  rounded-lg border-dashed items-center justify-between`}
                      >
                        <View style={tw`flex-row gap-3`}>
                          <Image
                            source={{ uri: item?.uri }}
                            style={tw`w-12 h-12 rounded-lg`}
                          />
                          <View style={tw`gap-1`}>
                            <Text>{item?.fileName}</Text>
                            {/* file size convert ot mb */}
                            <Text>{bytesToMB(item?.fileSize) + "MB"}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setFieldValue(
                              "image",
                              values?.image.filter((item, i) => i !== index)
                            );
                          }}
                        >
                          <SvgXml xml={IconDelete} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>

                <View style={tw`px-4 py-8`}>
                  <TButton
                    onPress={() => {
                      router?.push("/driver/in_review");
                    }}
                    title={t("driver.vehicleInfo.submitButton")}
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

export default vehicle_information;

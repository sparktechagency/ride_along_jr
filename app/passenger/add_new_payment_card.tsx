import {
  IconAmericanCard,
  IconCamera,
  IconDiscoverCard,
  IconMasterCard,
  IconVisa,
} from "@/assets/icon/Icon";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";
import { Checkbox } from "react-native-ui-lib";

const data = [
  { label: "United States", value: "1" },
  { label: "Bangladesh", value: "2" },
  { label: "Canada", value: "3" },
  { label: "France", value: "4" },
  { label: "Italy", value: "5" },
  { label: "Japan", value: "6" },
  { label: "Dubai", value: "7" },
];

const add_new_pyment_card = () => {
  const [checkBox, setCheckBox] = React.useState(false);
  const router = useRouter();
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const { t } = useTranslation();

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && { color: "#788498" },
            tw`bg-[#ecf0f1] rounded-lg`,
          ]}
        >
          {t("passenger.payment.cardNumber")}
        </Text>
      );
    }
    return null;
  };

  return (
    <View>
      <BackWithComponent
        togather
        title={t("passenger.payment.addPaymentMethod")}
        onPress={() => router.back()}
      />

      <View style={tw`px-4`}>
        <View style={tw`flex-row justify-between `}>
          <Text style={tw`font-bold text-sm font-NunitoSansRegular`}>
            {t("driver.payment.cardInformation")}
          </Text>
          <TouchableOpacity style={tw`flex-row items-center gap-1`}>
            <SvgXml xml={IconCamera} />
            <Text
              style={tw`text-[#5C7B7E]  font-bold text-sm font-NunitoSansRegular`}
            >
              {t("driver.payment.scanCard")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`my-1`}>
          <View style={tw`border border-gray-300 rounded-lg p-3`}>
            <View style={tw`flex-row justify-between items-center`}>
              <TextInput
                placeholder={t("passenger.payment.cardNumber")}
                keyboardType="numeric"
                style={tw`text-lg flex-1`}
              />
              <SvgXml style={tw`w-6 h-4 mr-1`} xml={IconVisa} />
              <SvgXml style={tw`w-6 h-4 mr-1`} xml={IconMasterCard} />
              <SvgXml style={tw`w-6 h-4 mr-1`} xml={IconAmericanCard} />
              <SvgXml style={tw`w-6 h-4 `} xml={IconDiscoverCard} />
            </View>
          </View>
          <View style={tw`flex-row mt-3`}>
            <View style={tw`flex-1 border border-gray-300 rounded-lg p-3 mr-2`}>
              <TextInput
                placeholder={t("driver.payment.expiryDate")}
                keyboardType="numeric"
                style={tw`text-lg`}
              />
            </View>
            <View style={tw`flex-1 border border-gray-300 rounded-lg p-3`}>
              <TextInput
                placeholder={t("passenger.payment.cvv")}
                keyboardType="numeric"
                secureTextEntry
                style={tw`text-lg`}
              />
            </View>
          </View>

          <Text style={tw`text-lg font-semibold mt-5`}>
            {t("driver.payment.billingAddress")}
          </Text>

          <View style={tw`mt-2`}>
            {renderLabel()}

            <Dropdown
              style={[
                styles.dropdown,
                isFocus && { borderColor: "blue" },
                tw` border border-gray-300 rounded-lg p-3 w-full`,
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? t("driver.payment.selectCountry") : "..."}
              searchPlaceholder={t("driver.payment.search")}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View style={tw`border border-gray-300 rounded-lg p-3 mt-2`}>
            <TextInput
              placeholder={t("driver.payment.zipCode")}
              keyboardType="numeric"
              style={tw`text-lg`}
            />
          </View>

          <View style={tw`flex-row items-center my-4`}>
            <Checkbox
              style={tw`w-5 h-5 border border-gray-400 rounded mr-2`}
              value={checkBox}
              onValueChange={setCheckBox}
              color={PrimaryColor}
            />
            <Text style={tw`text-sm font-medium text-gray-700`}>
              {t("driver.payment.saveCardFuture")}
            </Text>
          </View>

          <TButton
            title={t("passenger.payment.saveCard")}
            onPress={() => {
              router.back();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
  },
  label: {
    position: "absolute",
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default add_new_pyment_card;

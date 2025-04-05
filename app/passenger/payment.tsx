import { IconPlus, IconVisa } from "@/assets/icon/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

const payment = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <View>
        <BackWithComponent
          togather
          title={t("passenger.payment.paymentMethods")}
          onPress={() => router.back()}
        />

        <View style={tw`p-4 rounded-lg gap-4`}>
          <View
            style={tw`border border-gray-300 rounded-lg px-2 py-2 flex-row justify-between items-center`}
          >
            <View>
              <Text style={tw`text-gray-500 text-sm`}>
                {t("passenger.payment.cardNumber")}
              </Text>
              <Text style={tw`text-lg font-semibold`}>123********1542</Text>
            </View>
            <SvgXml xml={IconVisa} />
          </View>

          <TouchableOpacity
            onPress={() => router.push("/passenger/add_new_payment_card")}
            style={tw`mt-4 bg-gray-200 py-3 rounded-full flex-row items-center justify-center`}
          >
            <SvgXml xml={IconPlus} />
            <Text style={tw`text-[#1E3050] text-lg font-semibold ml-2`}>
              {t("passenger.payment.addPaymentMethod")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default payment;

import { Image, Text, View } from "react-native";

import { IconNotification } from "@/assets/icon/Icon";
import tw from "@/lib/tailwind";
import React from "react";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

const notification = () => {
  const [isNotification, setIsNotification] = React.useState(true);
  const { t } = useTranslation();

  return (
    <>
      <View style={tw`flex-row items-center justify-between px-4 `}>
        <Text
          style={tw`text-start text-xl font-bold my-5 font-NunitoSansRegular`}
        >
          {t("passenger.notifications.title")}
        </Text>
        {isNotification && (
          <Text
            style={tw`text-base font-semibold font-NunitoSansRegular text-[#5C7B7E]`}
          >
            {t("passenger.notifications.readAll")}
          </Text>
        )}
      </View>

      {isNotification ? (
        <>
          {/* ------------------ dynamic data ------------ */}
          <View style={tw`px-4  `}>
            <View style={tw` border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-1 flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`flex-1 `}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      {t("passenger.notifications.newDriver")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={tw` text-sm font-normal text-[#3E4F6B]`}
                    >
                      {t("passenger.notifications.driverDescription")}
                    </Text>
                  </View>
                </View>
                <View style={tw``}>
                  <Text
                    style={tw` text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                  >
                    {t("passenger.notifications.timeStamp")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={tw` border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-1 flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`flex-1 `}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      {t("passenger.notifications.paymentSuccessful")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={tw` text-sm font-normal text-[#3E4F6B]`}
                    >
                      {t("passenger.notifications.paymentDescription")}
                    </Text>
                  </View>
                </View>
                <View style={tw``}>
                  <Text
                    style={tw` text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                  >
                    {t("passenger.notifications.timeStamp")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={tw` border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-1 flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`flex-1 `}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      {t("passenger.notifications.paymentSuccessful")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={tw` text-sm font-normal text-[#3E4F6B]`}
                    >
                      {t("passenger.notifications.paymentDescription")}
                    </Text>
                  </View>
                </View>
                <View style={tw``}>
                  <Text
                    style={tw` text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                  >
                    {t("passenger.notifications.timeStamp")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={tw` border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-1 flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`flex-1 `}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      {t("passenger.notifications.paymentSuccessful")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={tw` text-sm font-normal text-[#3E4F6B]`}
                    >
                      {t("passenger.notifications.paymentDescription")}
                    </Text>
                  </View>
                </View>
                <View style={tw``}>
                  <Text
                    style={tw` text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                  >
                    {t("passenger.notifications.timeStamp")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={tw` border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-1 flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`flex-1 `}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      {t("passenger.notifications.paymentSuccessful")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={tw` text-sm font-normal text-[#3E4F6B]`}
                    >
                      {t("passenger.notifications.paymentDescription")}
                    </Text>
                  </View>
                </View>
                <View style={tw``}>
                  <Text
                    style={tw` text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                  >
                    {t("passenger.notifications.timeStamp")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={tw` border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-1 flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`flex-1 `}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      {t("passenger.notifications.paymentSuccessful")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={tw` text-sm font-normal text-[#3E4F6B]`}
                    >
                      {t("passenger.notifications.paymentDescription")}
                    </Text>
                  </View>
                </View>
                <View style={tw``}>
                  <Text
                    style={tw` text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                  >
                    {t("passenger.notifications.timeStamp")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={tw`py-12 px-24 justify-center gap-4`}>
            <SvgXml xml={IconNotification} />
            <Text
              style={tw`text-3xl text-center font-bold font-NunitoSansRegular`}
            >
              {t("passenger.notifications.nothingToShow")}
            </Text>
            <Text style={tw`text-base text-center font-semibold mb-3`}>
              {t("passenger.notifications.notifyUpdates")}
            </Text>
          </View>
        </>
      )}
    </>
  );
};

export default notification;

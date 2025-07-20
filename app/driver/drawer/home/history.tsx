import {
  IconCalendar,
  IconEmptyHistory,
  IconSmallStar,
} from "@/assets/icon/Icon";
import { Image, Text, View } from "react-native";

import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

const history = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isHistory, setIsHisory] = React.useState(true);

  return (
    <View>
      <Text
        style={tw`text-center text-xl font-bold my-5 font-NunitoSansRegular`}
      >
        {t("driver.history.title")}
      </Text>

      {isHistory ? (
        <>
          <View style={tw`px-4 `}>
            <Text style={tw`font-bold text-sm text-[#3E4F6B]`}>
              {t("driver.history.januaryDate")}
            </Text>
            <View style={tw`border-b border-gray-300`}>
              {/* ------------------ dynamic data ------------ */}

              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/Ellipse.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        John smith
                      </Text>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        <SvgXml xml={IconSmallStar} /> 4.2
                      </Text>
                    </View>

                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-sm font-medium text-[#788498] items-center`}
                      >
                        <SvgXml xml={IconCalendar} />{" "}
                        {t("driver.history.dateTime")}
                      </Text>
                      <Text style={tw`text-sm font-medium text-[#457205] ml-1`}>
                        {t("driver.history.completed")}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={tw`text-lg font-bold text-black font-NunitoSansRegular`}
                >
                  $124.00
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/Ellipse.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        John smith
                      </Text>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        <SvgXml xml={IconSmallStar} /> 4.2
                      </Text>
                    </View>

                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-sm font-medium text-[#788498] items-center`}
                      >
                        <SvgXml xml={IconCalendar} />{" "}
                        {t("driver.history.dateTime")}
                      </Text>
                      <Text style={tw`text-sm font-medium text-[#457205] ml-1`}>
                        {t("driver.history.completed")}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={tw`text-lg font-bold text-black font-NunitoSansRegular`}
                >
                  $124.00
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/Ellipse.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        John smith
                      </Text>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        <SvgXml xml={IconSmallStar} /> 4.2
                      </Text>
                    </View>

                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-sm font-medium text-[#788498] items-center`}
                      >
                        <SvgXml xml={IconCalendar} />{" "}
                        {t("driver.history.dateTime")}
                      </Text>
                      <Text style={tw`text-sm font-medium text-[#457205] ml-1`}>
                        {t("driver.history.completed")}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={tw`text-lg font-bold text-black font-NunitoSansRegular`}
                >
                  $124.00
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/Ellipse.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        John smith
                      </Text>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        <SvgXml xml={IconSmallStar} /> 4.2
                      </Text>
                    </View>

                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-sm font-medium text-[#788498] items-center`}
                      >
                        <SvgXml xml={IconCalendar} />{" "}
                        {t("driver.history.dateTime")}
                      </Text>
                      <Text style={tw`text-sm font-medium text-[#457205] ml-1`}>
                        {t("driver.history.completed")}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={tw`text-lg font-bold text-black font-NunitoSansRegular`}
                >
                  $124.00
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/Ellipse.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        John smith
                      </Text>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        <SvgXml xml={IconSmallStar} /> 4.2
                      </Text>
                    </View>

                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-sm font-medium text-[#788498] items-center`}
                      >
                        <SvgXml xml={IconCalendar} />{" "}
                        {t("driver.history.dateTime")}
                      </Text>
                      <Text style={tw`text-sm font-medium text-[#457205] ml-1`}>
                        {t("driver.history.completed")}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={tw`text-lg font-bold text-black font-NunitoSansRegular`}
                >
                  $124.00
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/Ellipse.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        John smith
                      </Text>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        <SvgXml xml={IconSmallStar} /> 4.2
                      </Text>
                    </View>

                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-sm font-medium text-[#788498] items-center`}
                      >
                        <SvgXml xml={IconCalendar} />{" "}
                        {t("driver.history.dateTime")}
                      </Text>
                      <Text style={tw`text-sm font-medium text-[#457205] ml-1`}>
                        {t("driver.history.completed")}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={tw`text-lg font-bold text-black font-NunitoSansRegular`}
                >
                  $124.00
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("@/assets/images/Ellipse.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        John smith
                      </Text>
                      <Text style={tw`text-base font-bold text-[#172B4D]`}>
                        <SvgXml xml={IconSmallStar} /> 4.2
                      </Text>
                    </View>

                    <View style={tw`flex-row items-center`}>
                      <Text
                        style={tw`text-sm font-medium text-[#788498] items-center`}
                      >
                        <SvgXml xml={IconCalendar} />{" "}
                        {t("driver.history.dateTime")}
                      </Text>
                      <Text style={tw`text-sm font-medium text-[#457205] ml-1`}>
                        {t("driver.history.completed")}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={tw`text-lg font-bold text-black font-NunitoSansRegular`}
                >
                  $124.00
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={tw`py-12 px-24 justify-center gap-4`}>
          <SvgXml xml={IconEmptyHistory} />
          <Text
            style={tw`text-3xl text-center font-bold font-NunitoSansRegular`}
          >
            {t("driver.history.noRidesYet")}
          </Text>
          <Text style={tw`text-base text-center font-semibold mb-3`}>
            {t("driver.history.afterTripMessage")}
          </Text>
          <TButton
            title={t("driver.history.requestTrip")}
            onPress={() => {
              router.push("/");
            }}
          />
        </View>
      )}
    </View>
  );
};

export default history;

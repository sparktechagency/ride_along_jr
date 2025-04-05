import { ScrollView, Text, View } from "react-native";

import { IconAbout } from "@/assets/icon/Icon";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

const about = () => {
  const router = useRouter();
  const { t } = useTranslation();

  // ====== about item ==================

  const items = [
    t("driver.about.item1"),
    t("driver.about.item2"),
    t("driver.about.item3"),
    t("driver.about.item4"),
    t("driver.about.item5"),
  ];

  return (
    <ScrollView contentContainerStyle={tw`pb-10`}>
      <View>
        <BackWithComponent
          togather
          onPress={() => {
            router?.back();
          }}
          title={t("driver.about.title")}
        />

        <View style={tw`items-center`}>
          <SvgXml xml={IconAbout} />
        </View>

        <View>
          <Text
            style={tw`font-bold text-3xl my-6 px-4 text-[#172B4D] font-NunitoSansRegular`}
          >
            {t("driver.about.appTitle")}
          </Text>
        </View>
        <View>
          <Text style={tw`my-3 px-4 text-lg font-normal`}>
            {t("driver.about.overviewTitle")}
          </Text>
          <Text style={tw`my-3 px-4 text-lg font-normal mt-3`}>
            {t("driver.about.overviewText")}
          </Text>
        </View>
        <View>
          <Text style={tw`my-3 px-4 text-lg font-normal`}>
            {t("driver.about.howItWorksTitle")}
          </Text>

          {items.map((item, index) => (
            <Text key={index} style={tw`my-2 px-4 text-lg font-normal`}>
              {index + 1}. {item}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default about;

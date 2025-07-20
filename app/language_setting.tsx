import { IconLanguas, IconLanguasEnglish } from "@/assets/icon/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const LanguageSettings = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const router = useRouter();

  const handleLanguageChange = async (language: string) => {
    await changeLanguage(language);
  };

  return (
    <ScrollView>
      <BackWithComponent
        togather
        title={t("languageSettings.title")}
        onPress={() => router.back()}
      />
      <View style={tw`items-center my-6 px-9`}>
        <SvgXml style={tw`my-7`} xml={IconLanguas} />
        <Text style={tw`text-2xl font-bold font-NunitoSansRegular`}>
          {t("languageSettings.selectPrimary")}
        </Text>
      </View>

      <View style={tw`gap-3`}>
        <TouchableOpacity
          onPress={() => handleLanguageChange("en")}
          style={tw` flex-row justify-between bg-white w-[370px] h-24 items-center mx-auto rounded-2xl p-4`}
        >
          <View>
            <Checkbox
              value={currentLanguage === "en"}
              onValueChange={() => handleLanguageChange("en")}
              color={PrimaryColor}
              style={tw`rounded-full w-6 h-6`}
            />
            <Text style={tw`my-1 font-bold text-lg text-[#405658]`}>
              {t("languageSettings.english")}
            </Text>
          </View>
          <SvgXml xml={IconLanguasEnglish} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleLanguageChange("es")}
          style={tw` flex-row justify-between bg-white w-[370px] h-24 items-center mx-auto rounded-2xl px-4`}
        >
          <View>
            <Checkbox
              value={currentLanguage === "es"}
              onValueChange={() => handleLanguageChange("es")}
              color={PrimaryColor}
              style={tw`rounded-full w-6 h-6`}
            />
            <Text style={tw`my-1 font-bold text-lg text-[#405658]`}>
              {t("languageSettings.spanish")}
            </Text>
          </View>
          <SvgXml xml={IconLanguasEnglish} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LanguageSettings;

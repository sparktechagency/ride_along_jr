import { Image, ScrollView, Text, View } from "react-native";

import { ImgRocket } from "@/assets/images";
import BackButton from "@/lib/backHeader/BackButton";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

const InReviewScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <BackButton onPress={() => router.back()} />

      <ScrollView>
        {/* Illustration */}
        <View style={tw`my-4 justify-center items-center`}>
          <Image
            source={ImgRocket} // Replace with the actual illustration source
            style={tw`w-52 h-52`}
          />
        </View>

        {/* User Info */}
        <Text
          style={tw`text-3xl font-NunitoSansBold text-deepBlue300 text-center`}
        >
          John Smith
        </Text>
        <Text style={tw`text-center text-base text-deepBlue300`}>
          ID: 545065
        </Text>

        {/* Status */}
        <View
          style={tw`my-4 self-center bg-[#f4e3ad4d] px-5 py-1 rounded-full`}
        >
          <Text
            style={tw`text-lg text-center text-[#F5851E] font-NunitoSansSemiBold`}
          >
            {t("driver.inReview.title")}
          </Text>
        </View>

        {/* Review Status */}
        <View style={tw`my-4 bg-deepBlue50 px-4 py-10 rounded-lg gap-4`}>
          <Text style={tw` text-xl text-deepBlue300 font-NunitoSansBold`}>
            {t("driver.inReview.title")}
          </Text>
          <Text style={tw` text-base text-deepBlue200 font-NunitoSansRegular`}>
            {t("driver.inReview.description")}
          </Text>
          <Text style={tw` text-base text-deepBlue300 font-NunitoSansSemiBold`}>
            Review time: 48 hours
          </Text>
        </View>
      </ScrollView>

      {/* Back to Home Button */}
      <View style={tw`flex-1 items-center my-4`}>
        <TButton
          title={t("driver.inReview.checkStatus")}
          onPress={() => router.push("/driver/drawer/home")}
          containerStyle={tw`w-full bg-transparent `}
          titleStyle={tw`text-primary text-base font-NunitoSansSemiBold`}
        />
      </View>
    </View>
  );
};

export default InReviewScreen;

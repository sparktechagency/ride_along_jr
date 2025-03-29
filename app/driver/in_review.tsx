import { Image, ScrollView, Text, View } from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import { ImgRocket } from "@/assets/images";
import React from "react";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const InReviewScreen = () => {
  const router = useRouter();

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
            In Review
          </Text>
        </View>

        {/* Review Status */}
        <View style={tw`my-4 bg-deepBlue50 px-4 py-10 rounded-lg gap-4`}>
          <Text style={tw` text-xl text-deepBlue300 font-NunitoSansBold`}>
            Your application is in review
          </Text>
          <Text style={tw` text-base text-deepBlue200 font-NunitoSansRegular`}>
            Thank you for sharing the info. You'll get an email once we're done
            reviewing.
          </Text>
          <Text style={tw` text-base text-deepBlue300 font-NunitoSansSemiBold`}>
            Review time: 48 hours
          </Text>
        </View>
      </ScrollView>

      {/* Back to Home Button */}
      <View style={tw`flex-1 items-center my-4`}>
        <TButton
          title="Back to Home"
          onPress={() => router.push("/driver/drawer/home")}
          containerStyle={tw`w-full bg-transparent `}
          titleStyle={tw`text-primary text-base font-NunitoSansSemiBold`}
        />
      </View>
    </View>
  );
};

export default InReviewScreen;

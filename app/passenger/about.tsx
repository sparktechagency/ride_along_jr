import { ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

import { IconAbout } from "@/assets/icon/Icon";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";

const about = () => {
  const router = useRouter();

  // ====== about item ==================

  const items = [
    "Sign Up & Verification: Parents and guardians create accounts and verify their identity.",
    "Add Child Profiles: Input child details, including pickup locations, destinations, and emergency contacts.",
    "Book a Ride: Choose immediate or scheduled rides with preferred drivers.",
    "Track in Real-Time: Monitor rides and receive live updates.",
    "Payment & Feedback: Complete rides securely and leave feedback for drivers.",
  ];

  return (
    <ScrollView contentContainerStyle={tw`pb-10`}>
      <View>
        <BackWithComponent
          togather
          onPress={() => {
            router?.back();
          }}
          title={"About application"}
        />

        <View style={tw`items-center`}>
          <SvgXml xml={IconAbout} />
        </View>

        <View>
          <Text
            style={tw`font-bold text-3xl my-6 px-4 text-[#172B4D] font-NunitoSansRegular`}
          >
            About Ride Along Jr application
          </Text>
        </View>
        <View>
          <Text style={tw`my-3 px-4 text-lg font-normal`}>Overview</Text>
          <Text style={tw`my-3 px-4 text-lg font-normal mt-3`}>
            Ride Along Jr is a user-friendly ride-sharing application designed
            specifically for families and young passengers. The app provides a
            safe, efficient, and convenient way for parents to schedule rides
            for their children, ensuring a reliable transportation experience
            with verified drivers.
          </Text>
        </View>
        <View>
          <Text style={tw`my-3 px-4 text-lg font-normal`}>How It Works:</Text>

          {items.map((item, index) => (
            <Text style={tw`my-2 px-4 text-lg font-normal`}>
              {index + 1}. {item}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default about;

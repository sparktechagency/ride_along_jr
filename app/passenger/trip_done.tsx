import { IconTripLocation, IconVisaCardWithOutBg } from "@/assets/icon/Icon";
import { ScrollView, Text, View } from "react-native";

import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { useRouter } from "expo-router";
import React from "react";
import { Rating } from "react-native-ratings";
import { SvgXml } from "react-native-svg";

const trip_done = () => {
  const [isFeedBack, setIsFeedBack] = React.useState("");
  const [isTrips, setTrips] = React.useState("");

  const router = useRouter();

  return (
    <View style={tw`flex-1 bg-base`}>
      <ScrollView>
        <View style={tw` justify-center items-center py-8`}>
          <SvgXml xml={IconTripLocation} />
          <View
            style={tw`gap-4 pt-4 pb-6 justify-center items-center border-b border-b-gray-200 w-full`}
          >
            <Text style={tw`text-2xl text-deepBlue300 font-NunitoSansBold`}>
              Your kids' trip is over
            </Text>
            <View style={tw`flex-row gap-1  justify-center`}>
              <Text
                style={tw`text-base text-deepBlue300  font-NunitoSansExtraBold`}
              >
                $
              </Text>
              <Text
                style={tw`text-3xl text-deepBlue300 font-NunitoSansExtraBold`}
              >
                124.00
              </Text>
            </View>
            <View
              style={tw`w-16 justify-center items-center bg-[#EFF2F2] rounded-full `}
            >
              <SvgXml xml={IconVisaCardWithOutBg} />
            </View>
          </View>
          <View style={tw`py-4 gap-4`}>
            <Text
              style={tw`text-base text-black text-center font-NunitoSansRegular`}
            >
              Rate your experience with John
            </Text>
            <Text
              style={tw`text-base text-black font-NunitoSansExtraBold text-center`}
            >
              Better
            </Text>
            <Rating
              ratingBackgroundColor={PrimaryColor}
              // ratingColor={PrimaryColor}
              tintColor="#EFF2F2"
              // showRating
              onFinishRating={(rating) => console.log("Rating is: ", rating)}
              style={{ paddingVertical: 10 }}
            />
            <View
              style={tw`flex-row flex-wrap gap-4 w-[80%] justify-center items-center`}
            >
              <TButton
                title="Poor"
                containerStyle={tw`h-10 px-6 ${
                  isFeedBack === "Poor" ? "bg-deepBlue100" : "bg-deepBlue50"
                }`}
                titleStyle={tw`text-sm text-deepBlue300 font-NunitoSansBold`}
                onPress={() => {
                  setIsFeedBack("Poor");
                }}
              />
              <TButton
                title="Good"
                containerStyle={tw`h-10 px-6 ${
                  isFeedBack === "Good" ? "bg-deepBlue100" : "bg-deepBlue50"
                }`}
                titleStyle={tw`text-sm text-deepBlue300 font-NunitoSansBold`}
                onPress={() => {
                  setIsFeedBack("Good");
                }}
              />
              <TButton
                title="Better"
                containerStyle={tw`h-10 px-6 ${
                  isFeedBack === "Better" ? "bg-deepBlue100" : "bg-deepBlue50"
                }`}
                titleStyle={tw`text-sm text-deepBlue300 font-NunitoSansBold`}
                onPress={() => {
                  setIsFeedBack("Better");
                }}
              />
              <TButton
                title="Best"
                containerStyle={tw`h-10 px-6 ${
                  isFeedBack === "Best" ? "bg-deepBlue100" : "bg-deepBlue50"
                }`}
                titleStyle={tw`text-sm text-deepBlue300 font-NunitoSansBold`}
                onPress={() => {
                  setIsFeedBack("Best");
                }}
              />
              <TButton
                title="Excellent"
                containerStyle={tw`h-10 px-6 ${
                  isFeedBack === "Excellent"
                    ? "bg-deepBlue100"
                    : "bg-deepBlue50"
                }`}
                titleStyle={tw`text-sm text-deepBlue300 font-NunitoSansBold`}
                onPress={() => {
                  setIsFeedBack("Excellent");
                }}
              />
            </View>
          </View>

          <View style={tw`gap-4 py-3`}>
            <Text
              style={tw`text-base text-center text-deepBlue300 font-NunitoSansRegular`}
            >
              Tip for John
            </Text>
            <View style={tw`flex-row gap-3`}>
              <TButton
                title="$5"
                containerStyle={tw`h-12 w-12 rounded-full ${
                  isTrips === "5" ? "bg-deepBlue100" : "bg-deepBlue50"
                }`}
                titleStyle={tw`text-sm text-deepBlue300 font-NunitoSansBold `}
                onPress={() => {
                  setTrips("5");
                }}
              />
              <TButton
                title="$10"
                containerStyle={tw`h-12 w-12 rounded-full ${
                  isTrips === "10" ? "bg-deepBlue100" : "bg-deepBlue50"
                }`}
                titleStyle={tw`text-sm text-deepBlue300 font-NunitoSansBold `}
                onPress={() => {
                  setTrips("10");
                }}
              />
              <TButton
                title="$15"
                containerStyle={tw`h-12 w-12 rounded-full ${
                  isTrips === "15" ? "bg-deepBlue100" : "bg-deepBlue50"
                }`}
                titleStyle={tw`text-sm text-deepBlue300 font-NunitoSansBold `}
                onPress={() => {
                  setTrips("15");
                }}
              />
            </View>
          </View>
          <View style={tw`flex-row gap-4 py-4 mx-4`}>
            <TButton
              onPress={() => {
                router.replace("/passenger/drawer/home");
              }}
              title="Done"
              containerStyle={tw`flex-1 `}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default trip_done;

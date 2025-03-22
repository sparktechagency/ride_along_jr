import {
  IconClose,
  IconLocationSelections,
  IconMyLocation,
  IconOtherLocation,
  IconSmallSearch,
} from "@/assets/icon/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import InputText from "@/lib/inputs/InputText";
import IwtButton from "@/lib/buttons/IwtButton";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

interface IWhereYouGoComponentProps {
  handleClosePress: () => void;
  setTravelData: (data: any) => void;
  travelData: {
    destination: string;
    pickup: string;
  };
  currentLocation: any;

  // setStep?: (step: number) => void;
}

const WhereYouGoComponent = ({
  handleClosePress,
  setTravelData,
  travelData,
  currentLocation,
}: // setStep,
IWhereYouGoComponentProps) => {
  const router = useRouter();
  return (
    <>
      {/* Content part */}
      <View style={tw`bg-base rounded-t-2xl pb-5`}>
        {/* Header part */}

        {/* <View
                  style={tw`w-[20%] h-[.4rem] bg-gray-400 rounded-full self-center`}
                /> */}
        <View
          style={tw`px-4 pb-4 border-b border-b-gray-200 flex-row items-center justify-between`}
        >
          <TouchableOpacity
            onPress={() => {
              handleClosePress();
            }}
          >
            <SvgXml xml={IconClose} />
          </TouchableOpacity>
          <Text style={tw`text-xl text-deepBlue300 font-NunitoSansBold`}>
            Where you wanna go?
          </Text>
          <View />
        </View>
      </View>

      <BottomSheetScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw``}
      >
        <View style={tw`mt-4 mb-6 px-4 flex-row items-center gap-2`}>
          {/* Search bar */}
          <SvgXml xml={IconLocationSelections} />
          <View style={tw`gap-4 flex-1`}>
            <InputText
              textXOutRangeFirst={10}
              textXOutRangeSecond={15}
              placeholder="Pickup from"
              containerStyle={tw``}
              value={travelData?.destination || ""}
              onChangeText={(text) => {
                setTravelData({ ...travelData, destination: text });
              }}
            />
            <InputText
              textXOutRangeFirst={10}
              textXOutRangeSecond={15}
              placeholder="Destination"
              containerStyle={tw``}
              value={travelData?.pickup || ""}
              onChangeText={(text) => {
                setTravelData({ ...travelData, pickup: text });
              }}
            />
          </View>
        </View>
        {travelData?.destination && travelData?.pickup && (
          <IwtButton
            onPress={() => {
              // sheetRef?.current?.close();
              // setStep && setStep(1);
              router?.push("/estimated_details");
            }}
            containerStyle={tw` mx-4`}
            svg={IconSmallSearch}
            title="Go "
          />
        )}
        {travelData?.destination || (
          <TouchableOpacity
            onPress={() => {
              setTravelData({
                ...travelData,
                destination:
                  currentLocation?.addressResponse![0].formattedAddress,
              });
            }}
            style={tw`px-4 py-4 flex-row items-center border-t border-t-gray-200 gap-4`}
          >
            <SvgXml xml={IconMyLocation} />
            <Text style={tw`text-lg text-deepBlue400 font-NunitoSansBold`}>
              Use my current location
            </Text>
          </TouchableOpacity>
        )}
        {travelData.pickup || (
          <>
            <TouchableOpacity
              onPress={() => {
                setTravelData({
                  ...travelData,
                  pickup: "Los Angeles, CA, near Griffith Park",
                });
              }}
              style={tw`px-4 py-4 flex-row items-center border-t border-t-gray-200 gap-4`}
            >
              <SvgXml xml={IconOtherLocation} />
              <View>
                <Text style={tw`text-lg text-deepBlue400 font-NunitoSansBold`}>
                  Hollywood Sign,
                </Text>
                <Text
                  style={tw`text-base text-deepBlue100 font-NunitoSansMedium`}
                >
                  Los Angeles, CA, near Griffith Park
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </BottomSheetScrollView>
    </>
  );
};

export default WhereYouGoComponent;

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  IconClose,
  IconLocationSelections,
  IconMyLocation,
  IconOtherLocation,
  IconSmallSearch,
} from "@/assets/icon/Icon";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILocation } from "./passenger/(tabs)";
import InputText from "@/lib/inputs/InputText";
import IwtButton from "@/lib/buttons/IwtButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const search = () => {
  const router = useRouter();

  const [currentLocation, setCurrentLocation] = React.useState<ILocation>();

  const [data, setData] = React.useState<{
    destination: string;
    pickup: string;
  }>({
    destination: "",
    pickup: "",
  });

  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["1%", "45%", "60%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    if (index === 0) {
      sheetRef.current?.close();
      router.back();
    }
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    router.back();
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleGetLocation = async () => {
    const location = await AsyncStorage.getItem("location");
    setCurrentLocation(JSON.parse(location));
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  useEffect(() => {
    if (data?.destination && data?.pickup) {
      sheetRef.current?.snapToIndex(1);
    }
  }, [data]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <BottomSheet
        index={1}
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        // backdropComponent={renderBackdrop}
      >
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

        <BottomSheetScrollView contentContainerStyle={tw``}>
          <View style={tw`mt-4 mb-6 px-4 flex-row items-center gap-2`}>
            {/* Search bar */}
            <SvgXml xml={IconLocationSelections} />
            <View style={tw`gap-4 flex-1`}>
              <InputText
                textXOutRangeFirst={10}
                textXOutRangeSecond={15}
                placeholder="Pickup from"
                containerStyle={tw``}
                value={data.destination}
                onChangeText={(text) => {
                  setData({ ...data, destination: text });
                }}
              />
              <InputText
                textXOutRangeFirst={10}
                textXOutRangeSecond={15}
                placeholder="Destination"
                containerStyle={tw``}
                value={data.pickup}
                onChangeText={(text) => {
                  setData({ ...data, pickup: text });
                }}
              />
            </View>
          </View>
          {data?.destination && data?.pickup && (
            <IwtButton
              containerStyle={tw` mx-4`}
              svg={IconSmallSearch}
              title="Go "
            />
          )}
          {data?.destination || (
            <TouchableOpacity
              onPress={() => {
                setData({
                  ...data,
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
          {data.pickup || (
            <>
              <TouchableOpacity
                onPress={() => {
                  setData({
                    ...data,
                    pickup: "Los Angeles, CA, near Griffith Park",
                  });
                }}
                style={tw`px-4 py-4 flex-row items-center border-t border-t-gray-200 gap-4`}
              >
                <SvgXml xml={IconOtherLocation} />
                <View>
                  <Text
                    style={tw`text-lg text-deepBlue400 font-NunitoSansBold`}
                  >
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
      </BottomSheet>
    </KeyboardAwareScrollView>
  );
};

export default search;

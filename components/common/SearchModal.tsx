import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  IconClose,
  IconLocationSelections,
  IconMyLocation,
  IconOtherLocation,
} from "@/assets/icon/Icon";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import InputText from "@/lib/inputs/InputText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const SearchModal = () => {
  const router = useRouter();

  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["1%", "60%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    router.back();
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        onPress={handleClosePress}
      />
    ),
    []
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        height: "100%",
        position: "absolute",
      }}
      keyboardShouldPersistTaps="handled"
    >
      <BottomSheet
        index={1}
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
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
                router.back();
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
              <InputText placeholder="Pickup from" containerStyle={tw``} />
              <InputText placeholder="Destination" />
            </View>
          </View>
          <TouchableOpacity
            style={tw`px-4 py-4 flex-row items-center border-t border-t-gray-200 gap-4`}
          >
            <SvgXml xml={IconMyLocation} />
            <Text style={tw`text-lg text-deepBlue400 font-NunitoSansBold`}>
              Use my current location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
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
          <TouchableOpacity
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
          <TouchableOpacity
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
          <TouchableOpacity
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
          <TouchableOpacity
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
          <TouchableOpacity
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
          <TouchableOpacity
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
          <TouchableOpacity
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
        </BottomSheetScrollView>
      </BottomSheet>
    </KeyboardAwareScrollView>
  );
};

export default SearchModal;

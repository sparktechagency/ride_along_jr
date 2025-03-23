import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  IconClose,
  IconLocationSelections,
  IconMyLocation,
  IconOtherLocation,
  IconSmallSearch,
} from "@/assets/icon/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleMaps } from "expo-maps";
import { ILocation } from "./(tabs)";
import InputText from "@/lib/inputs/InputText";
import IwtButton from "@/lib/buttons/IwtButton";
import React from "react";
import { SvgXml } from "react-native-svg";
import axios from "axios";
import tw from "@/lib/tailwind";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

const where_go = () => {
  const router = useRouter();

  const [selectMarker, setSelectMarker] = React.useState({
    pickup: {
      coordinates: {
        latitude: 34.052235,
        longitude: -118.243683,
      },
      title: "Your current location",

      icon: "https://img.icons8.com/ios-glyphs/30/000000/marker.png",
      draggable: true,
      showCallout: true,
      snippet: "Your current location",
    },
    destination: {
      coordinates: {
        latitude: 34.052235,
        longitude: -118.243683,
      },
      title: "Your current location",

      icon: "https://img.icons8.com/ios-glyphs/red/30/000000/marker.png",
      draggable: true,
      showCallout: true,
      snippet: "Your current location",
    },
  });

  const [travelData, setTravelData] = React.useState({
    destination: "",
    pickup: "",
  });

  const sheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["10%", "45%", "60%", "90%"], []);

  // callbacks
  const handleSheetChange = React.useCallback((index: number) => {}, []);

  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
    router.back();
  }, []);
  const handleSnapPress = React.useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const isFocused = useIsFocused();
  const [currentLocation, setCurrentLocation] = React.useState<ILocation>();
  const handleGetLocationFormLS = async () => {
    // get location from local storage
    const location = await AsyncStorage.getItem("location");
    if (location) {
      setCurrentLocation(JSON.parse(location));
    }
  };

  React.useEffect(() => {
    handleGetLocationFormLS();
  }, []);

  const handleSearchLocation = async (query: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyARXa6r8AXKRaoeWqyesQNBI8Y3EUEWSnY`
      );
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    // handleSearchLocation();
  }, [travelData.pickup, travelData.destination]);

  console.log(currentLocation);

  return (
    <View style={tw`flex-1 bg-[#EFF2F2]`}>
      {isFocused && (
        <View style={tw`w-full h-full `}>
          <GoogleMaps.View
            style={tw`flex-1 rounded-t-lg`}
            uiSettings={{
              zoomControlsEnabled: false,
              compassEnabled: true,
              myLocationButtonEnabled: true,
              mapToolbarEnabled: true,
              scrollGesturesEnabled: true,
              tiltGesturesEnabled: true,
              zoomGesturesEnabled: true,
              indoorLevelPickerEnabled: true,
              rotationGesturesEnabled: true,
              scaleBarEnabled: true,
              scrollGesturesEnabledDuringRotateOrZoom: true,
              togglePitchEnabled: true,
            }}
            properties={{
              isTrafficEnabled: true,
              isMyLocationEnabled: true,
              mapType: GoogleMaps.MapType.NORMAL,

              isIndoorEnabled: true,
              maxZoomPreference: 50,
              minZoomPreference: 17,
              selectionEnabled: true,
            }}
            cameraPosition={{
              zoom: 17.5,
            }}
            colorScheme={GoogleMaps.MapColorScheme.FOLLOW_SYSTEM}
            // onPOIClick={(event) => {
            //   console.log(event);
            // }}
            onMarkerClick={(event) => {
              console.log(event);
            }}
            onMapClick={(event) => {
              console.log(event);
            }}
            markers={[]}
            userLocation={{
              coordinates: {
                latitude: currentLocation?.location?.coords?.latitude || 0.0,
                longitude: currentLocation?.location?.coords?.longitude || 0.0,
              },

              followUserLocation: true,
              // enabled: true,
            }}
          />
        </View>
      )}

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

        <BottomSheetScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={tw``}
        >
          <View
            style={tw`mt-4 mb-6 px-4 flex-row items-center gap-2 text-red-500`}
          >
            {/* Search bar */}
            <SvgXml xml={IconLocationSelections} />
            <View style={tw`gap-4 flex-1`}>
              <InputText
                textXOutRangeFirst={10}
                textXOutRangeSecond={15}
                placeholder="Pickup from"
                containerStyle={tw``}
                value={travelData?.destination}
                onChangeText={(text) => {
                  setTravelData({ ...travelData, destination: text });
                }}
              />
              <InputText
                textXOutRangeFirst={10}
                textXOutRangeSecond={15}
                placeholder="Destination"
                containerStyle={tw``}
                value={travelData?.pickup}
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
          {!travelData?.destination && (
            <TouchableOpacity
              onPress={() => {
                setTravelData({
                  ...travelData,
                  destination:
                    currentLocation?.addressResponse?.formattedAddress,
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
          {!travelData?.pickup && (
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

        {/* End screens */}
      </BottomSheet>
    </View>
  );
};

export default where_go;

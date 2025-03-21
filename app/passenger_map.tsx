import * as Location from "expo-location";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  IconClose,
  IconLocation,
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
import tw from "@/lib/tailwind";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

const passenger_map = () => {
  const router = useRouter();

  const [travelData, setTravelData] = React.useState({
    destination: "",
    pickup: "",
  });

  const sheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["1%", "45%", "60%", "90%"], []);

  // callbacks
  const handleSheetChange = React.useCallback((index: number) => {
    if (index === 0 && !travelData?.destination && !travelData?.pickup) {
      sheetRef.current?.close();

      router.back();
    }
  }, []);

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
    } else {
      const newLocation = await Location.getCurrentPositionAsync({});
      // Reverse geocode to get address
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
      });
      AsyncStorage.setItem(
        "location",
        JSON.stringify({ location, addressResponse })
      );
    }
  };

  React.useEffect(() => {
    handleGetLocationFormLS();
  }, []);

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
              mapType: GoogleMaps.MapType.HYBRID,

              isIndoorEnabled: true,
              maxZoomPreference: 50,
              minZoomPreference: 17,
              selectionEnabled: true,
            }}
            cameraPosition={{
              coordinates: {
                latitude:
                  currentLocation?.location?.coords?.latitude || 34.052235,
                longitude:
                  currentLocation?.location?.coords?.longitude || -118.243683,
              },
              zoom: 18,
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
            markers={[
              {
                coordinates: {
                  latitude:
                    currentLocation?.location?.coords?.latitude || 34.052235,
                  longitude:
                    currentLocation?.location?.coords?.longitude || -118.243683,
                },
                title: "Your current location",

                icon: IconLocation,
                draggable: true,
                showCallout: true,
                snippet: "Your current location",
              },
            ]}
            userLocation={{
              coordinates: {
                latitude:
                  currentLocation?.location?.coords?.latitude || 34.052235,
                longitude:
                  currentLocation?.location?.coords?.longitude || -118.243683,
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
                value={travelData.destination}
                onChangeText={(text) => {
                  setTravelData({ ...travelData, destination: text });
                }}
              />
              <InputText
                textXOutRangeFirst={10}
                textXOutRangeSecond={15}
                placeholder="Destination"
                containerStyle={tw``}
                value={travelData.pickup}
                onChangeText={(text) => {
                  setTravelData({ ...travelData, pickup: text });
                }}
              />
            </View>
          </View>
          {travelData?.destination && travelData?.pickup && (
            <IwtButton
              onPress={() => {
                sheetRef?.current?.close();
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
    </View>
  );
};

export default passenger_map;

import * as Location from "expo-location";

import {
  IconCloseRed,
  IconDestination,
  IconLocation,
  IconPaymentMethod,
  IconPickup,
} from "@/assets/icon/Icon";
import { Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "@gorhom/bottom-sheet";
import { GoogleMaps } from "expo-maps";
import { ILocation } from "./(tabs)";
import IwtButton from "@/lib/buttons/IwtButton";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

const request_car = () => {
  const router = useRouter();

  const [step, setStep] = React.useState(0);

  const [travelData, setTravelData] = React.useState({
    destination: "",
    pickup: "",
  });

  const sheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["1%", "49%"], []);

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
        <View style={tw`px-4`}>
          <View
            style={tw`flex-row justify-between items-center pb-2 border-b border-b-gray-200`}
          >
            <View style={tw`gap-0.1`}>
              <Text style={tw`text-lg font-NunitoSansBold text-deepBlue300`}>
                Checking vehicle nearby...
              </Text>
              <Text style={tw`text-xs font-NunitoSansRegular text-deepBlue200`}>
                Only a few seconds to go
              </Text>
            </View>
            <Text style={tw`text-base font-NunitoSansRegular text-deepBlue200`}>
              28 sec
            </Text>
          </View>

          <View>
            <View
              style={tw`flex-row items-center gap-2 py-4 border-b border-b-gray-200`}
            >
              <SvgXml xml={IconPickup} />
              <View style={tw` `}>
                <Text
                  style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                >
                  Pickup
                </Text>
                <Text
                  style={tw`text-base font-NunitoSansBold text-deepBlue300`}
                >
                  4206 AVALON BLVD
                </Text>
              </View>
            </View>
            <View
              style={tw`flex-row items-center gap-2 py-4 border-b border-b-gray-200`}
            >
              <SvgXml xml={IconDestination} />
              <View style={tw` `}>
                <Text
                  style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                >
                  Destination
                </Text>
                <Text
                  style={tw`text-base font-NunitoSansBold text-deepBlue300`}
                >
                  239 S COMMONWEALTH AVE
                </Text>
              </View>
            </View>
            <View
              style={tw`flex-row items-center  gap-2 py-4 border-b border-b-gray-200`}
            >
              <SvgXml xml={IconPaymentMethod} />
              <View style={tw`flex-1 flex-row justify-between items-end`}>
                <View style={tw``}>
                  <Text
                    style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                  >
                    Payment method
                  </Text>
                  <Text
                    style={tw`text-base font-NunitoSansBold text-deepBlue300`}
                  >
                    VISA Card
                  </Text>
                </View>
                <View>
                  <Text
                    style={tw` text-base font-NunitoSansBold text-deepBlue300`}
                  >
                    $124.00
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <IwtButton
            svg={IconCloseRed}
            title="Cancel Ride"
            containerStyle={tw`mt-4 bg-transparent gap-1 h-14`}
            titleStyle={tw`text-[#D21F18] font-NunitoSansBold `}
            onPress={() => {
              router?.back();
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default request_car;

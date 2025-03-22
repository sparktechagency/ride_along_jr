import * as Location from "expo-location";

import {
  IconBackArray,
  IconCar,
  IconDot,
  IconLocation,
  IconMinus,
  IconNormalUser,
  IconPlus,
  IconRightArrow,
  IconVisaCard,
} from "@/assets/icon/Icon";
import { Image, Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "@gorhom/bottom-sheet";
import { GoogleMaps } from "expo-maps";
import { ILocation } from "./(tabs)";
import { ImgCar } from "@/assets/images";
import React from "react";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

const estimated_details = () => {
  const router = useRouter();

  const [step, setStep] = React.useState(0);

  const [travelData, setTravelData] = React.useState({
    destination: "",
    pickup: "",
  });

  const sheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["1%", "55%"], []);

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
        <View>
          <TouchableOpacity
            onPress={() => {
              router?.back();
            }}
            style={tw`flex-row items-center gap-2 px-4 pb-4`}
          >
            <SvgXml xml={IconBackArray} />
            <Text style={tw`text-base font-NunitoSansBold`}>
              Estimated Details
            </Text>
          </TouchableOpacity>
          <View>
            <View>
              <Image source={ImgCar} style={tw` self-center`} />
            </View>
            <View style={tw`px-4 flex-row justify-between items-end`}>
              <View>
                <SvgXml xml={IconCar} />
                <View style={tw`flex-row items-center `}>
                  <Text
                    style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                  >
                    In 15 min
                  </Text>
                  <SvgXml xml={IconDot} />
                  <View style={tw`flex-row items-center gap-2`}>
                    <SvgXml xml={IconNormalUser} />
                    <Text
                      style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                    >
                      2 kids
                    </Text>
                  </View>
                </View>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <Text style={tw`text-2xl font-NunitoSansBold text-black`}>
                  $240.00
                </Text>
              </View>
            </View>
          </View>
          <View
            style={tw`flex-row justify-between items-center px-4 py-5 border-b border-b-gray-200`}
          >
            <Text
              style={tw`text-base font-NunitoSansRegular text-deepBlue100 `}
            >
              Kids
            </Text>
            <View style={tw`flex-row items-center gap-6`}>
              <TouchableOpacity>
                <SvgXml xml={IconMinus} />
              </TouchableOpacity>
              <Text style={tw`text-base font-NunitoSansBold`}>2</Text>
              <TouchableOpacity>
                <SvgXml xml={IconPlus} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={tw`flex-row items-center justify-between px-4 py-5`}
          >
            <View>
              <Text style={tw`text-base font-NunitoSansBold text-black  `}>
                Payment method
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <SvgXml xml={IconVisaCard} />
              <SvgXml xml={IconRightArrow} />
            </View>
          </TouchableOpacity>
          <View style={tw`px-4`}>
            <TButton
              title="Request Now"
              onPress={() => {
                router?.push("/request_car");
              }}
            />
          </View>
        </View>

        {/* End screens */}
      </BottomSheet>
    </View>
  );
};

export default estimated_details;

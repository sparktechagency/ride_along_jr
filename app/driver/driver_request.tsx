import {
  IconCloseRed,
  IconDestination,
  IconDot,
  IconNormalUser,
  IconPickup,
} from "@/assets/icon/Icon";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IwtButton from "@/lib/buttons/IwtButton";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import MapViewDirections from "react-native-maps-directions";
import { SvgXml } from "react-native-svg";

interface ILocation {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  formatted_address: string;
}

const driver_responding = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [travelData, setTravelData] = React.useState({
    destination: "",
    pickup: "",
  });
  const mapRef = React.useRef<MapView>(null);
  const sheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["10%", "60%"], []);

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
  const [travelReadyData, setTravelReadyData] = React.useState<{
    pickup: ILocation | null;
    destination: ILocation | null;
  }>();
  const handleGetLocationFormLS = async () => {
    // get location from local storage
    const location = await AsyncStorage.getItem("travelData");
    if (location) {
      setTravelReadyData(JSON.parse(location));
    }
  };

  React.useEffect(() => {
    handleGetLocationFormLS();
  }, []);

  return (
    <View style={tw`flex-1 bg-[#EFF2F2]`}>
      {isFocused && (
        <View style={tw`w-full h-full `}>
          <MapView
            ref={mapRef}
            mapType="standard"
            style={tw`flex-1 rounded-lg`}
            rotateEnabled
            scrollEnabled
            loadingEnabled
            userInterfaceStyle="light"
            // showsUserLocation
            // userLocationUpdateInterval={20}
            followsUserLocation
            region={{
              latitude: travelReadyData?.pickup?.geometry?.location?.lat || 0.0,
              longitude:
                travelReadyData?.pickup?.geometry?.location?.lng || 0.0,
              latitudeDelta: 0.0015, // Zoom ~16.4
              longitudeDelta: 0.0015, // Adjust based on aspect ratio
            }}
            onMapReady={() => {
              console.log("Map is ready!");
            }}
            // showsUserLocation={true} // Disable default user location marker
            provider="google"
            showsTraffic={true}
            // mapPadding={{ bottom: -50, left: -50 }} // This pushes the logo off-screen
            showsBuildings={false}
            showsCompass
            showsIndoors
            showsMyLocationButton
            showsScale
            zoomEnabled
            zoomControlEnabled
          >
            {/* Current Location Marker (if no pickup selected) */}
            {/* {!travelReadyData?.pick && currentLocation?.location?.coords && (
              <Marker
                coordinate={{
                  latitude: currentLocation.location.coords.latitude,
                  longitude: currentLocation.location.coords.longitude,
                }}
                title={travelReadyData?.pick?.name}
                description={travelReadyData?.pick?.formatted_address}
                pinColor="blue"
              />
            )} */}

            {/* Pickup Marker */}
            {travelReadyData?.pickup?.geometry?.location && (
              <Marker
                coordinate={{
                  latitude: travelReadyData.pickup.geometry.location.lat,
                  longitude: travelReadyData.pickup.geometry.location.lng,
                }}
                title={travelReadyData.pickup.name} // Fallback if custom callout fails
                description={travelReadyData.pickup.formatted_address} // Fallback
                calloutOffset={{ x: 0, y: -8 }} // Adjust callout position
                calloutAnchor={{ x: 0.5, y: 0 }} // Anchor point
                style={tw`w-10 h-10`}
              >
                {/* Custom marker view */}
                <SvgXml
                  xml={`<svg width="35" height="35" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="11.633" cy="11.335" r="8.863" stroke="#5C7B7E" stroke-width="4"/>
  <circle cx="11.633" cy="11.335" r="5.751" fill="white"/>
  </svg>
  `}
                />
              </Marker>
            )}

            {/* Destination Marker */}
            {travelReadyData?.destination?.geometry?.location && (
              <Marker
                coordinate={{
                  latitude: travelReadyData.destination.geometry.location.lat, // CORRECTED
                  longitude: travelReadyData.destination.geometry.location.lng, // CORRECTED
                }}
                title={travelReadyData.destination.name}
                description={travelReadyData.destination.formatted_address}
                pinColor="red"
              >
                <SvgXml
                  xml={`<svg width="35" height="35" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="11.633" cy="11.335" r="8.863" stroke="#D21F18" stroke-width="4"/>
  <circle cx="11.633" cy="11.335" r="5.751" fill="white"/>
  </svg>
  `}
                />
              </Marker>
            )}

            {/* Directions */}
            {travelReadyData?.pickup?.geometry?.location &&
              travelReadyData?.destination?.geometry?.location && (
                <MapViewDirections
                  origin={{
                    latitude: travelReadyData.pickup.geometry.location.lat,
                    longitude: travelReadyData.pickup.geometry.location.lng,
                  }}
                  destination={{
                    latitude: travelReadyData.destination.geometry.location.lat,
                    longitude:
                      travelReadyData.destination.geometry.location.lng,
                  }}
                  apikey="AIzaSyARXa6r8AXKRaoeWqyesQNBI8Y3EUEWSnY"
                  strokeWidth={8}
                  strokeColor="#F5851E"
                  mode="DRIVING"
                  onReady={(result) => {
                    mapRef.current?.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        top: 20,
                        right: 50,
                        bottom: 500, // Extra space at bottom for bottom sheet
                        left: 50,
                      },
                      animated: true,
                    });
                  }}
                  onError={(error) => console.log("Directions error:", error)}
                />
              )}
          </MapView>
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
        <View style={tw`px-4 `}>
          <View
            style={tw`flex-row justify-between items-center pb-2 border-b border-b-gray-200`}
          >
            <View style={tw`gap-0.1`}>
              <Text style={tw`text-lg font-NunitoSansBold text-deepBlue300`}>
                {t("driver.trip.driverResponding")}
              </Text>
            </View>
          </View>

          <View>
            <View style={tw`px-4 flex-row justify-between items-end`}>
              <View>
                <View style={tw`flex-row items-center gap-2 pt-4`}>
                  <Text style={tw`text-2xl font-NunitoSansBold text-black`}>
                    15 min - ${240.0 * 0.2 * 5}
                  </Text>
                </View>
                <View style={tw`flex-row items-center `}>
                  <Text
                    style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                  >
                    15k
                  </Text>
                  <SvgXml xml={IconDot} />
                  <View style={tw`flex-row items-center gap-2`}>
                    <SvgXml xml={IconNormalUser} />
                    <Text
                      style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                    >
                      {5} kids
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={tw`flex-row items-center gap-2 py-4 border-b border-b-gray-200`}
            >
              <SvgXml xml={IconPickup} />
              <View style={tw`flex-1 `}>
                <Text
                  style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                >
                  {t("driver.trip.pickupLocation")}
                </Text>
                <Text
                  style={tw`text-base font-NunitoSansBold text-deepBlue300`}
                >
                  {travelReadyData?.pickup?.formatted_address}
                </Text>
              </View>
            </View>
            <View
              style={tw`flex-row items-center gap-2 py-4 border-b border-b-gray-200`}
            >
              <SvgXml xml={IconDestination} />
              <View style={tw`flex-1 `}>
                <Text
                  style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                >
                  {t("driver.trip.dropoffLocation")}
                </Text>
                <Text
                  style={tw`text-base font-NunitoSansBold text-deepBlue300`}
                >
                  {travelReadyData?.destination?.formatted_address}
                </Text>
              </View>
            </View>
          </View>

          <TButton
            title={t("common.accept")}
            containerStyle={tw`mt-4  gap-1 h-14`}
            titleStyle={tw``}
            onPress={() => {
              router?.push("/driver/driver_arriving");
            }}
          />
          <IwtButton
            svg={IconCloseRed}
            title={t("driver.trip.cancelTrip")}
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

export default driver_responding;

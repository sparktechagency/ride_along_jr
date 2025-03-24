import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  IconClose,
  IconLocationSelections,
  IconMyLocation,
  IconSmallSearch,
} from "@/assets/icon/Icon";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILocation } from "./(tabs)";
import { IPlace } from "@/interfaces/map";
import InputText from "@/lib/inputs/InputText";
import IwtButton from "@/lib/buttons/IwtButton";
import MapViewDirections from "react-native-maps-directions";
import React from "react";
import { SvgXml } from "react-native-svg";
import axios from "axios";
import tw from "@/lib/tailwind";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

const where_go = () => {
  const router = useRouter();

  const [travelData, setTravelData] = React.useState({
    destination: "",
    pickup: "",
  });
  const [travelReadyData, setTravelReadyData] = React.useState<{
    pickup: IPlace;
    destination: IPlace;
  } | null>(null);

  const [isPickup, setIsPickup] = React.useState<boolean>(false);
  const [locationSuggestions, setLocationSuggestions] = React.useState<[]>([]);

  const sheetRef = React.useRef<BottomSheet>(null);
  const mapRef = React.useRef<MapView>(null);

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
      setLocationSuggestions(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

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
            initialRegion={{
              latitude: currentLocation?.location?.coords?.latitude || 0.0,
              longitude: currentLocation?.location?.coords?.longitude || 0.0,
              latitudeDelta: 0.0015,
              longitudeDelta: 0.0015,
            }}
            region={{
              latitude:
                travelReadyData?.pickup?.geometry?.location?.lat ||
                currentLocation?.location?.coords?.latitude ||
                0.0,
              longitude:
                travelReadyData?.pickup?.geometry?.location?.lng ||
                currentLocation?.location?.coords?.longitude ||
                0.0,
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
                    // Fit the map to show the entire route
                    mapRef.current?.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        top: 100,
                        right: 50,
                        bottom: 300, // Extra space at bottom for bottom sheet
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
                value={travelData?.pickup}
                onChangeText={(text) => {
                  handleSearchLocation(text);
                  setIsPickup(true);
                  setTravelData({ ...travelData, pickup: text });
                }}
              />
              <InputText
                textXOutRangeFirst={10}
                textXOutRangeSecond={15}
                placeholder="Destination"
                containerStyle={tw``}
                value={travelData?.destination}
                onChangeText={(text) => {
                  handleSearchLocation(text);
                  setIsPickup(false);
                  setTravelData({ ...travelData, destination: text });
                }}
              />
            </View>
          </View>
          {travelReadyData?.destination?.formatted_address &&
            travelReadyData?.destination?.formatted_address && (
              <IwtButton
                onPress={() => {
                  // sheetRef?.current?.close();
                  // setStep && setStep(1);
                  AsyncStorage.setItem(
                    "travelData",
                    JSON.stringify(travelReadyData)
                  );
                  router?.push("/estimated_details");
                }}
                containerStyle={tw` mx-4`}
                svg={IconSmallSearch}
                title="Go "
              />
            )}
          {!travelData?.pickup && (
            <TouchableOpacity
              onPress={() => {
                setTravelData({
                  ...travelData,
                  pickup: currentLocation?.addressResponse?.formattedAddress,
                });
                setTravelReadyData({
                  ...travelReadyData,
                  pickup: {
                    name: currentLocation?.addressResponse?.formattedAddress,
                    geometry: {
                      location: {
                        lat: currentLocation?.location?.coords?.latitude || 0.0,
                        lng:
                          currentLocation?.location?.coords?.longitude || 0.0,
                      },
                    },
                    formatted_address:
                      currentLocation?.addressResponse?.formattedAddress,
                  },
                });
                handleSearchLocation("");
              }}
              style={tw`px-4 py-4 flex-row items-center border-t border-t-gray-200 gap-4`}
            >
              <SvgXml xml={IconMyLocation} />
              <Text style={tw`text-lg text-deepBlue400 font-NunitoSansBold`}>
                Use my current location
              </Text>
            </TouchableOpacity>
          )}
          {locationSuggestions?.map((suggestion: IPlace) => (
            <TouchableOpacity
              onPress={() => {
                if (isPickup) {
                  setTravelData({
                    ...travelData,
                    pickup: suggestion?.formatted_address,
                  });
                  setTravelReadyData({
                    ...travelReadyData,
                    pickup: suggestion,
                    destination: travelReadyData?.destination || suggestion, // Ensure destination is defined
                  });
                  handleSearchLocation("");
                } else {
                  setTravelData({
                    ...travelData,
                    destination: suggestion?.formatted_address,
                  });
                  setTravelReadyData({
                    pickup: travelReadyData?.pickup || suggestion, // Ensure pickup is defined
                    destination: suggestion,
                  });
                  handleSearchLocation("");
                }
              }}
              style={tw`px-4 py-4 flex-row items-center border-t border-t-gray-200 gap-4`}
            >
              {/* <SvgXml xml={IconOtherLocation} /> */}
              <Image source={{ uri: suggestion?.icon }} style={tw`w-8 h-8 `} />
              <View style={tw`flex-1`}>
                <Text style={tw` text-lg text-deepBlue400 font-NunitoSansBold`}>
                  {suggestion?.name}
                </Text>
                <Text
                  style={tw`text-base text-deepBlue100 font-NunitoSansMedium`}
                >
                  {suggestion?.formatted_address}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>

        {/* End screens */}
      </BottomSheet>
    </View>
  );
};

export default where_go;

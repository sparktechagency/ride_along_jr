import * as Location from "expo-location";

import { IconLocation, IconMapDirection, IconMenu } from "@/assets/icon/Icon";
import { useNavigation, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Avatar from "@/lib/ui/Avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SvgXml } from "react-native-svg";
// import { GoogleMaps } from "expo-maps";
import tw from "@/lib/tailwind";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export interface ILocation {
  addressResponse: {
    city: string;
    country: string;
    district: string;
    formattedAddress: string;
    isoCountryCode: string;
    name: string;
    postalCode: string;
    region: string;
    street: string;
    streetNumber: string;
    subregion: string;
    timezone: string;
  };

  location: {
    coords: {
      accuracy: number;
      altitude: number;
      altitudeAccuracy: number;
      heading: number;
      latitude: number;
      longitude: number;
      speed: number;
    };
    mocked: bigint;
    timestamp: number;
  };
}

const home = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation();

  const [currentLocation, setCurrentLocation] = React.useState<ILocation>();

  const [loading, setLoading] = React.useState(false);

  const isFocused = useIsFocused();

  // console.log(currentLocation);

  const handleGetLocationFormLS = async () => {
    setLoading(true);
    // get location from local storage
    const location = await AsyncStorage.getItem("location");
    const exitLocation = JSON.parse(location!);
    if (exitLocation?.location) {
      setCurrentLocation(exitLocation);
      setLoading(false);
    } else {
      Location.requestForegroundPermissionsAsync();
      Location.requestBackgroundPermissionsAsync();
      const newLocation = await Location.getCurrentPositionAsync({});
      // Reverse geocode to get address
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
      });
      setCurrentLocation({
        location: newLocation,
        addressResponse: addressResponse![0],
      });
      setLoading(false);
      await AsyncStorage.setItem(
        "location",
        JSON.stringify({
          location: newLocation,
          addressResponse: addressResponse![0],
        })
      );
    }
  };

  React.useEffect(() => {
    handleGetLocationFormLS();
  }, [isFocused]);

  // console.log(currentLocation);

  return (
    <View style={tw`flex-1 bg-[#EFF2F2]`}>
      {/* header parts  */}
      <View style={tw`p-4 flex-row items-center  justify-between`}>
        <TouchableOpacity
          onPress={() => {
            (navigation as any)?.openDrawer();
          }}
        >
          <SvgXml xml={IconMenu} />
        </TouchableOpacity>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`font-NunitoSansRegular text-black text-xl`}>
            {t("passenger.home.welcomeBack")}
          </Text>
          <Text style={tw`font-NunitoSansBold text-black text-xl`}>Lana</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            router?.push("/passenger/profile");
          }}
        >
          <Avatar
            size={32}
            source={{
              uri: "https://picsum.photos/id/237/200/300",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={tw`px-4 my-8 gap-3`}>
        {/* main content  */}
        <Text style={tw`text-deepBlue200 font-NunitoSansRegular text-sm`}>
          {t("passenger.home.currentLocation")}
        </Text>
        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={IconLocation} />
          <Text style={tw`text-base font-NunitoSansBold text-[#405658]`}>
            {currentLocation?.addressResponse &&
              currentLocation?.addressResponse?.formattedAddress}
          </Text>
        </View>
        {!isFocused || loading ? (
          <View style={tw`w-full h-80 my-4 pb-0.5  rounded-lg bg-gray-300`}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={tw`w-full h-80 my-4 pb-0.5  rounded-lg`}>
            <MapView
              mapType="standard"
              style={tw`flex-1 rounded-lg`}
              initialRegion={{
                latitude: currentLocation?.location?.coords?.latitude || 0.0,
                longitude: currentLocation?.location?.coords?.longitude || 0.0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={{
                latitude: currentLocation?.location?.coords?.latitude || 0.0,
                longitude: currentLocation?.location?.coords?.longitude || 0.0,
                latitudeDelta: 0.0015, // Zoom ~16.4
                longitudeDelta: 0.0015, // Adjust based on aspect ratio
              }}
              onMapReady={() => {
                console.log("Map is ready!");
              }}
              showsBuildings={false}
              // showsUserLocation={true} // Disable default user location marker
              provider="google"
              showsTraffic={true}
              mapPadding={{ bottom: -50, left: -50 }} // This pushes the logo off-screen
            >
              <Marker
                coordinate={{
                  latitude: currentLocation?.location?.coords?.latitude || 0.0,
                  longitude:
                    currentLocation?.location?.coords?.longitude || 0.0,
                }}
                title={t("passenger.home.currentLocation")}
                description={t("passenger.home.currentLocation")}
                pinColor="green"
                calloutAnchor={{ x: 0.5, y: 0.5 }}
                anchor={{ x: 0.5, y: 0.5 }} // Center the marker (default: x=0.5, y=1.0)
              >
                <SvgXml
                  xml={`<svg width="35" height="35" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11.633" cy="11.335" r="8.863" stroke="#5C7B7E" stroke-width="4"/>
                <circle cx="11.633" cy="11.335" r="5.751" fill="white"/>
                </svg>
                `}
                />
              </Marker>
            </MapView>
          </View>
        )}

        <View style={tw`flex-row items-center gap-2`}>
          <View style={tw`shadow-md rounded-2xl self-start`}>
            <SvgXml xml={IconMapDirection} />
          </View>
          <TouchableOpacity
            onPress={() => {
              // router.push("/where_go");
              router.push("/passenger/where_go");
            }}
            style={tw`bg-white h-12 rounded-xl justify-center  shadow-md flex-1`}
          >
            <Text style={tw`px-4 font-NunitoSansRegular text-deepBlue `}>
              {t("passenger.home.whereTo")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default home;

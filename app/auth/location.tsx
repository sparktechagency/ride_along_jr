import * as Linking from "expo-linking";
import * as Location from "expo-location";

import { IconLocationWhite, IconMapWithLocation } from "@/assets/icon/Icon";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import IwtButton from "@/lib/buttons/IwtButton";
import tw from "@/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

export const LocationPermission = () => {
  const [locationPermission, setLocationPermission] = useState<string | null>(
    null
  );
  const { t } = useTranslation();
  const router = useRouter();

  const handleGetLocationFormLS = async () => {
    // get location from local storage
    const location = await AsyncStorage.getItem("location");
    const exitLocation = JSON.parse(location!);
    if (exitLocation?.location) {
      await AsyncStorage.setItem(
        "location",
        JSON.stringify({
          location: exitLocation?.location,
          addressResponse: exitLocation?.addressResponse,
        })
      );
    } else {
      Location.requestForegroundPermissionsAsync();
      Location.requestBackgroundPermissionsAsync();
      const newLocation = await Location.getCurrentPositionAsync({});
      setLocationPermission("granted");
      // Reverse geocode to get address
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
      });

      await AsyncStorage.setItem(
        "location",
        JSON.stringify({
          location: newLocation,
          addressResponse: addressResponse![0],
        })
      );
    }
  };

  useEffect(() => {
    if (locationPermission === "granted") {
      handleGetLocationFormLS();
    }
  }, [locationPermission]);

  return (
    <View style={tw`flex-1 bg-base`}>
      <View style={tw`flex-1 justify-center items-center pb-16`}>
        <View style={tw`flex-row items-center justify-center mt-10`}>
          <SvgXml width={250} height={200} xml={IconMapWithLocation} />
        </View>

        <View style={tw`justify-center items-center gap-3 my-8`}>
          <Text style={tw`text-deepBlue text-4xl font-NunitoSansExtraBold`}>
            {t("auth.location.enableLocation")}
          </Text>
          <Text
            style={tw`text-base text-black font-NunitoSansRegular text-center`}
          >
            {t("auth.location.description")}
          </Text>
        </View>
      </View>

      <View style={tw`px-4 pb-12`}>
        <IwtButton
          title={t("auth.location.enableLocation")}
          svg={IconLocationWhite}
          onPress={async () => {
            const granted = await Location.requestForegroundPermissionsAsync();
            if (granted) {
              const role = await AsyncStorage.getItem("role");
              if (role === "passenger") {
                router.push("/passenger/name");
              } else {
                router.push("/driver/name");
              }
            } else {
              console.log("Permission not granted");
              Linking.openSettings();
            }
            // route.push("/namePage");
          }}
        />
      </View>
      {/* <SearchModal /> */}
    </View>
  );
};

export default LocationPermission;

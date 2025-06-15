import * as Location from "expo-location";

import {
  IconLocationOnly,
  IconMenu,
  IconOverviewCar,
  IconOverviewClosed,
  IconOverviewDollar,
} from "@/assets/icon/Icon";
import { useNavigation, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Avatar from "@/lib/ui/Avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SvgXml } from "react-native-svg";
// import { GoogleMaps } from "expo-maps";
import TButton from "@/lib/buttons/TButton";
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
            {t("driver.home.welcomeBack")}
          </Text>
          <Text style={tw`font-NunitoSansBold text-black text-xl`}>John</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            router?.push("/driver/profile");
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
      <View style={tw`px-4  gap-3`}>
        <View>
          <Text style={tw`text-xl font-NunitoSansBold text-deepBlue300`}>
            {t("driver.home.overview")}
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw` gap-3`}
        >
          <View style={tw`bg-white p-3 rounded-lg gap-2  w-30`}>
            <SvgXml xml={IconOverviewCar} />
            <Text style={tw`text-sm font-NunitoSansRegular text-deepBlue300`}>
              {t("driver.home.completedToday")}
            </Text>
            <Text style={tw`text-xl font-NunitoSansBold text-deepBlue300`}>
              05
            </Text>
          </View>
          <View style={tw`bg-white p-3 rounded-lg gap-2  w-30`}>
            <SvgXml xml={IconOverviewClosed} />
            <Text style={tw`text-sm font-NunitoSansRegular text-deepBlue300`}>
              {t("driver.home.cancelledToday")}
            </Text>
            <Text style={tw`text-xl font-NunitoSansBold text-deepBlue300`}>
              01
            </Text>
          </View>
          <View style={tw`bg-white p-3 rounded-lg gap-2  w-30`}>
            <SvgXml xml={IconOverviewDollar} />
            <Text style={tw`text-sm font-NunitoSansRegular text-deepBlue300`}>
              {t("driver.home.revenueThisWeek")}
            </Text>
            <Text style={tw`text-xl font-NunitoSansBold text-deepBlue300`}>
              $1240
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={tw`px-4 my-8 gap-3`}>
        {/* main content  */}
        {/* <Text style={tw`text-deepBlue200 font-NunitoSansRegular text-sm`}>
          Your current location
        </Text>
        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={IconLocation} />
          <Text style={tw`text-base font-NunitoSansBold text-[#405658]`}>
            {currentLocation?.addressResponse &&
              currentLocation?.addressResponse?.formattedAddress}
          </Text>
        </View>
        {!isFocused || loading ? (
          <LoaderScreen
            color={PrimaryColor}
            size={"large"}
            containerStyle={tw`w-full min-h-80 my-4 pb-0.5  rounded-lg`}
          />
        ) : (
          <View style={tw`w-full h-52 my-4 pb-0.5  rounded-lg`}>
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
                title="Your Location"
                description="Your current location"
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
        )} */}

        <View style={tw`flex-row items-center  gap-2`}>
          <Text style={tw`text-xl font-NunitoSansBold text-deepBlue300`}>
            {t("driver.home.passengerRequests")}
          </Text>
          <View style={tw`px-2 py-1 rounded-full bg-primary`}>
            <Text style={tw`text-xs  text-white `}>1</Text>
          </View>
        </View>
        {/* <View>
          <Text style={tw`text-sm font-NunitoSansRegular text-deepBlue100`}>
            You have no passenger request's today.
          </Text>
        </View> */}
        {/* create card first user show image name price locaion etc */}
        <View>
          <TouchableOpacity
            onPress={() => {
              router?.push("/driver/driver_request");
            }}
            style={tw`bg-white p-3 rounded-lg`}
          >
            <View style={tw` flex-row items-center justify-center pb-4 gap-2`}>
              <SvgXml xml={IconLocationOnly} />
              <Text
                style={tw`flex-1 text-base font-NunitoSansBold text-deepBlue300 pt-2`}
              >
                2208 W 8TH ST LOS ANGELES, CA 90015
              </Text>
            </View>
            <View
              style={tw` bg-base p-3 rounded-lg gap-4 flex-row items-center justify-between`}
            >
              <View style={tw`flex-row gap-2 items-center`}>
                <Avatar
                  size={50}
                  source={{
                    uri: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  }}
                />
                <View style={tw``}>
                  <Text
                    style={tw`text-base font-NunitoSansBold text-deepBlue300`}
                  >
                    John Doe
                  </Text>
                  <Text
                    style={tw`text-sm font-NunitoSansMedium text-deepBlue300`}
                  >
                    {t("driver.home.kids")}: 4
                  </Text>
                </View>
              </View>
              <View>
                <TButton
                  onPress={() => {
                    router?.push("/driver/driver_arriving");
                  }}
                  title={`$500 ${t("common.accept")}`}
                  containerStyle={tw` w-[70%] self-end rounded-md`}
                  titleStyle={tw`text-xs font-NunitoSansBold text-white`}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default home;

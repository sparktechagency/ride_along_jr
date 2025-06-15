import {
  IconCall,
  IconCloseRed,
  IconDestination,
  IconMessage,
  IconOtpLocker,
  IconPaymentMethod,
  IconPickup,
  IconStar,
} from "@/assets/icon/Icon";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IwtButton from "@/lib/buttons/IwtButton";
import tw from "@/lib/tailwind";
import Avatar from "@/lib/ui/Avatar";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import MapViewDirections from "react-native-maps-directions";
import { SvgXml } from "react-native-svg";

// Define the ILocation interface locally to avoid the import error
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

const driver_arrived = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [travelData, setTravelData] = React.useState({
    destination: "",
    pickup: "",
  });
  const mapRef = React.useRef<MapView>(null);
  const sheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["1%", "75%"], []);

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

  React.useEffect(() => {
    setTimeout(() => {
      router?.push("/passenger/arrived_done");
    }, 3000);

    return () => {};
  }, []);

  const DRIVER_DETAILS = {
    name: "John Smith",
    rating: 4.5,
    vehicleDetails: "Toyota Corolla",
    vehicleNumber: "4985467868",
    img: require("@/assets/images/profile.png"),
  };

  const OTP = "1234";

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
                  latitude: travelReadyData.destination.geometry.location.lat,
                  longitude: travelReadyData.destination.geometry.location.lng,
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
        <View style={tw`px-4 `}>
          <View
            style={tw`flex-row justify-between items-center pb-2 border-b border-b-gray-200`}
          >
            <View style={tw`gap-0.1`}>
              <Text style={tw`text-lg font-NunitoSansBold text-deepBlue300`}>
                {t("passenger.trip.driverArrived")}
              </Text>
              <Text style={tw`text-xs font-NunitoSansRegular text-deepBlue200`}>
                {t("passenger.trip.waitingAtPickup")}
              </Text>
            </View>
            {/* <Text style={tw`text-base font-NunitoSansRegular text-deepBlue200`}>
                28 sec
              </Text>  */}
          </View>

          <View>
            <View
              style={tw`flex-row items-center justify-between gap-2 pt-3 pb-4 border-b border-b-gray-200`}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <Avatar
                  size={48}
                  source={{
                    uri: "https://s3-alpha-sig.figma.com/img/b223/3af5/eaaa66499916a4a89b1c52acbe944c44?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IsEBNvKbPuFopr3BWdnWqNIWiFDxb7DH9gyX~yS6C-ItZz5co2Yc2DPZNkpfWM9fUSaLXug4k3zA52CEyE5cCgihWbXNdi2y171jUxGFJXN34CtHh7sPlnzLx8w83JwtoG37SYOGO2TB9ce9PO96Y5rEzTNGX4v6mt3u34HKag0b~wK2DbFlPFKAvLSSbtQtE1t8WVqAbDiNjOc54bJ49tF~XPv8QyW5JYmIcRqUfQAgc7yzteUpFRK9InORbruycQqVOtoOca9UqylWUOyaBCRHn0RYhg~NlTJMvDFuDqosIY9RaaleFZI3acoTYGe~AJ2ewBS4WK1vGfWpK8253Q__",
                  }}
                />
                <View>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Text
                      style={tw`text-base font-NunitoSansBold text-deepBlue300`}
                    >
                      {DRIVER_DETAILS.name}
                    </Text>
                    <View style={tw`flex-row items-center gap-1`}>
                      <SvgXml xml={IconStar} />
                      <Text>{DRIVER_DETAILS.rating}</Text>
                    </View>
                  </View>
                  <View style={tw`gap-1`}>
                    <Text
                      style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                    >
                      {DRIVER_DETAILS.vehicleDetails}
                    </Text>
                    <Text
                      style={tw`text-xs font-NunitoSansBold text-deepBlue200 border border-deepBlue200 self-start px-2 py-0.1 rounded `}
                    >
                      {DRIVER_DETAILS.vehicleNumber}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <TouchableOpacity>
                  <SvgXml xml={IconMessage} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SvgXml xml={IconCall} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={tw`flex-row items-center justify-between py-4 border-b border-b-gray-200`}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconOtpLocker} />
                <Text
                  style={tw`text-base font-NunitoSansBold text-deepBlue300`}
                >
                  {t("passenger.trip.otpForRide")}
                </Text>
              </View>
              <View style={tw`flex-row gap-1`}>
                {OTP.split("").map((digit, i) => {
                  return (
                    <View
                      key={i}
                      style={tw`text-base font-NunitoSansBold bg-deepBlue50 h-10 w-10   self-center rounded-full justify-center items-center`}
                    >
                      <Text
                        style={tw`text-base font-NunitoSansBold  text-deepBlue300 `}
                      >
                        {digit}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View
              style={tw`flex-row items-center gap-2 py-4 border-b border-b-gray-200`}
            >
              <SvgXml xml={IconPickup} />
              <View style={tw` flex-1`}>
                <Text
                  style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                >
                  {t("passenger.trip.pickupLocation")}
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
              <View style={tw` flex-1`}>
                <Text
                  style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                >
                  {t("passenger.trip.dropoffLocation")}
                </Text>
                <Text
                  style={tw`text-base font-NunitoSansBold text-deepBlue300`}
                >
                  {travelReadyData?.destination?.formatted_address}
                </Text>
              </View>
            </View>
            <View
              style={tw`flex-row items-center  gap-2 py-4 border-b border-b-gray-200`}
            >
              <SvgXml xml={IconPaymentMethod} />
              <View style={tw`flex-1 flex-row justify-between items-end`}>
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                  >
                    {t("passenger.trip.paymentMethod")}
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
            title={t("passenger.trip.cancelRide")}
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

export default driver_arrived;

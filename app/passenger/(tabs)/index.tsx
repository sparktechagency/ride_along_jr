import { IconLocation, IconMapDirection, IconMenu } from "@/assets/icon/Icon";
import { useNavigation, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import { GoogleMaps } from "expo-maps";
import React from "react";
import { SvgXml } from "react-native-svg";
import { Avatar } from "react-native-ui-lib";

const home = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [currentLocation, setCurrentLocation] = React.useState({});
  const [search, setShear] = React.useState("");

  return (
    <View style={tw`flex-1 bg-[#EFF2F2]`}>
      {/* header parts  */}
      <View style={tw`p-4 flex-row items-center justify-between`}>
        <TouchableOpacity
          onPress={() => {
            (navigation as any)?.openDrawer();
          }}
        >
          <SvgXml xml={IconMenu} />
        </TouchableOpacity>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`font-NunitoSansRegular text-black text-xl`}>
            Welcome back,
          </Text>
          <Text style={tw`font-NunitoSansBold text-black text-xl`}>Lana</Text>
        </View>
        <Avatar
          size={32}
          source={{
            uri: "https://picsum.photos/id/237/200/300",
          }}
        />
      </View>
      <View style={tw`px-4 my-8 gap-3`}>
        {/* main content  */}
        <Text style={tw`text-deepBlue200 font-NunitoSansRegular text-sm`}>
          Your current location
        </Text>
        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml xml={IconLocation} />
          <Text style={tw`text-base font-NunitoSansBold text-[#405658]`}>
            2208 W 8TH ST LOS ANGELES
          </Text>
        </View>
        <View style={tw`w-full h-60 my-4 pb-0.5 shadow rounded-lg`}>
          <GoogleMaps.View
            style={tw`flex-1 rounded-lg`}
            uiSettings={{
              zoomControlsEnabled: false,
            }}
            properties={{
              isTrafficEnabled: true,
              isMyLocationEnabled: true,
              mapType: GoogleMaps.MapType.HYBRID,
            }}
            userLocation={{
              coordinates: {
                latitude: 34.052235,
                longitude: -118.243683,
              },
              followUserLocation: true,
              // enabled: true,
            }}
          />
        </View>
        <View style={tw`flex-row items-center gap-2`}>
          <View style={tw`shadow-md rounded-2xl self-start`}>
            <SvgXml xml={IconMapDirection} />
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push("/search");
            }}
            style={tw`bg-white h-12 rounded-xl justify-center  shadow-md flex-1`}
          >
            <Text style={tw`px-4 font-NunitoSansRegular text-deepBlue `}>
              Where do you wanna go?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default home;

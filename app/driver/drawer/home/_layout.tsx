import {
  IconHistorySelect,
  IconHistoryUnSelect,
  IconHomeSelect,
  IconHomeUnSelect,
  IconNotificationsSelect,
  IconNotificationsUnSelect,
} from "@/assets/icon/Icon";
import { Text, TouchableOpacity } from "react-native";

import tw from "@/lib/tailwind";
import { Tabs } from "expo-router";
import { SvgXml } from "react-native-svg";
import { View } from "react-native-ui-lib";

const TabBarButton = (props: any) => {
  return <TouchableOpacity {...props} />;
};

const TabsRoutes = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tw`h-16 pb-0 pt-1.5 `,
        tabBarItemStyle: tw`bg-white rounded-lg `,
        tabBarIconStyle: tw`w-6 h-6`,
        tabBarButton: TabBarButton,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: (props) => {
            return (
              <View style={tw`pt-0.5`}>
                <Text
                  style={[
                    tw`text-xs font-NunitoSansBold text-deepBlue200`,
                    props.focused && tw`text-deepBlue400`,
                  ]}
                >
                  Home
                </Text>
              </View>
            );
          },
          // tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
            <SvgXml xml={focused ? IconHomeSelect : IconHomeUnSelect} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: (props) => {
            return (
              <View style={tw`pt-0.5`}>
                <Text
                  style={[
                    tw`text-xs font-NunitoSansBold text-deepBlue200`,
                    props.focused && tw`text-deepBlue400`,
                  ]}
                >
                  History
                </Text>
              </View>
            );
          },
          // tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
            <SvgXml xml={focused ? IconHistorySelect : IconHistoryUnSelect} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: (props) => {
            return (
              <View style={tw`pt-0.5`}>
                <Text
                  style={[
                    tw`text-xs font-NunitoSansBold text-deepBlue200`,
                    props.focused && tw`text-deepBlue400`,
                  ]}
                >
                  Notifications
                </Text>
              </View>
            );
          },
          // tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={
                focused ? IconNotificationsSelect : IconNotificationsUnSelect
              }
            />
          ),
        }}
      />
      {/* <Tabs.Screen name="Profile"/> */}
    </Tabs>
  );
};

export default TabsRoutes;

import {
  IconHistorySelect,
  IconHistoryUnSelect,
  IconHomeSelect,
  IconHomeUnSelect,
  IconNotificationsSelect,
  IconNotificationsUnSelect,
} from "@/assets/icon/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

const TabBarButton = (props: any) => {
  return <TouchableOpacity {...props} />;
};

const TabsRoutes = () => {
  const { t } = useTranslation();

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
                  {t("driver.drawer.home")}
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
                  {t("driver.drawer.history")}
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
                  {t("driver.drawer.notifications")}
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

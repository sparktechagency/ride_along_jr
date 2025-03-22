import { Text, View } from "react-native";

import React from "react";
import { TabController } from "react-native-ui-lib";
import tw from "@/lib/tailwind";

const test = () => {
  const [DyIndex, setDyIndex] = React.useState(0);
  return (
    <View style={{ flex: 1 }}>
      <TabController
        items={[
          { label: "Tab 1", style: tw`flex-1 text-2xl h-full` },
          { label: "Tab 2", style: tw`flex-1 text-2xl h-full` },
        ]}
        initialIndex={DyIndex}
      >
        <TabController.TabPage style={{ flex: 1 }} lazy key={0} index={0}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
            }}
          >
            <Text onPress={() => setDyIndex(1)} style={tw`text-2xl`}>
              0
            </Text>
          </View>
        </TabController.TabPage>
        <TabController.TabPage style={{ flex: 1 }} lazy key={1} index={1}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "blue",
            }}
          >
            <Text onPress={() => setDyIndex(0)} style={tw`text-2xl`}>
              1
            </Text>
          </View>
        </TabController.TabPage>
      </TabController>
    </View>
  );
};

export default test;

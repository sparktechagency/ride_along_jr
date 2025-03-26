import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerRoutes = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Add your screens here */}
        {/* <Drawer.Screen name="profile" /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerRoutes;

import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import TripScreen from "../screens/TripScreen";
import StatusScreen from "../screens/StatusScreen";
import FlashNotificationScreen from "../screens/FlashNotificationScreen";
import OTPAuthScreen from "../screens/OTPAuthScreen"; // Import OTPAuthScreen for the authentication flow

const Tab = createBottomTabNavigator();

const Layout = () => {
  const [flashVisible, setFlashVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    reason: "",
    message: "",
  });

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName:
              | "home"
              | "home-outline"
              | "list"
              | "list-outline"
              | "flag"
              | "flag-outline" = "home-outline";

            if (route.name === "Home")
              iconName = focused ? "home" : "home-outline";
            else if (route.name === "Trips")
              iconName = focused ? "list" : "list-outline";
            else if (route.name === "Status")
              iconName = focused ? "flag" : "flag-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Trips" component={TripScreen} />
        <Tab.Screen name="Status" component={StatusScreen} />
        <Tab.Screen name="Authenticate" component={OTPAuthScreen} />
      </Tab.Navigator>

      {flashVisible && (
        <FlashNotificationScreen
          visible={flashVisible}
          onClose={() => setFlashVisible(false)}
          onSubmit={(reason: string, customMessage: string) => {
            console.log("Delay Report Submitted:", { reason, customMessage });
            setFlashVisible(false);
          }}
        />
      )}
    </>
  );
};

export default Layout;

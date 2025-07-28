import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import OneSignal from "react-native-onesignal";
import Layout from "./tabs/layout";
import { WebSocketService } from "./services/WebSocketService";
import FlashNotificationScreen from "./screens/FlashNotificationScreen";
import OTPAuthScreen from "./screens/OTPAuthScreen"; 
import SplashScreen from "./screens/SplashScreen"; 

const Stack = createStackNavigator();

const App = () => {
  const [flashVisible, setFlashVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    reason: "",
    message: "",
  });
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    OneSignal.setAppId("YOUR_ONESIGNAL_APP_ID");

    OneSignal.setNotificationWillShowInForegroundHandler((event) => {
      console.log("Notification will show in foreground:", event);
      const notification = event.getNotification();
      event.complete(notification);
    });

    OneSignal.setNotificationOpenedHandler((result) => {
      console.log("Notification opened:", result);
    });

    WebSocketService.connect();
    WebSocketService.onMessage((data: any) => {
      const parsedData = JSON.parse(data);
      if (parsedData.type === "delay_notification") {
        setNotificationData({
          reason: parsedData.reason,
          message: parsedData.message,
        });
        setFlashVisible(true);
      }
    });

    setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  const handleFlashSubmit = (reason: string, customMessage: string) => {
    console.log("Delay Report Submitted:", { reason, customMessage });
    setFlashVisible(false);
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isSplashVisible ? (
            <Stack.Screen
              name="Splash"
              component={() => <SplashScreen onFinish={() => setIsSplashVisible(false)} />} 
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="OTPAuth"
                component={OTPAuthScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={Layout}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
        <FlashNotificationScreen
          visible={flashVisible}
          onClose={() => setFlashVisible(false)}
          onSubmit={handleFlashSubmit}
        />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

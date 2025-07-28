import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import logo from "../assets/logo.png";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); 
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.appName}>Your App Name</Text> {/* App name */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20, 
  },
  appName: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});

export default SplashScreen;

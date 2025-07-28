import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "./SplashScreen";
import HomeScreen from "./HomeScreen";

const OTPAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Enter phone, 2: Enter OTP
  const [showSplash, setShowSplash] = useState(false); // To control SplashScreen visibility
  const navigation = useNavigation();

  const sendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:8000/send-otp/", {
        phone_number: phoneNumber,
      });
      Alert.alert("Success", response.data.message);
      setStep(2);
    } catch (error) {
      Alert.alert(
        "Error",
        (error as any).response?.data?.detail || "Failed to send OTP"
      );
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:8000/verify-otp/", {
        phone_number: phoneNumber,
        code: otp,
      });
      Alert.alert("Success", response.data.message);

      // Show the splash screen before navigating to Home
      setShowSplash(true);
    } catch (error) {
      Alert.alert(
        "Error",
        (error as any).response?.data?.detail || "Failed to verify OTP"
      );
    }
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : step === 1 ? (
        <>
          <Text style={styles.label}>Enter Phone Number:</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Button title="Send OTP" onPress={sendOTP} />
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter OTP:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <Button title="Verify OTP" onPress={verifyOTP} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default OTPAuthScreen;

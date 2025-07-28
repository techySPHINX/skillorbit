import React, { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

interface FlashNotificationScreenProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reason: string, customMessage: string) => void;
}

const FlashNotificationScreen: React.FC<FlashNotificationScreenProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");

  const delayReasons = [
    "Traffic congestion",
    "Vehicle breakdown",
    "Weather conditions",
    "Driver unavailability",
    "Route deviation",
    "Cargo issues",
    "Security concerns",
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Ionicons name="warning-outline" size={80} color="red" />
        <Text style={styles.title}>Delay Report</Text>
        <Text style={styles.subtitle}>Select a Reason:</Text>
        <View style={styles.reasonList}>
          {delayReasons.map((reason, index) => (
            <CustomButton
              key={index}
              title={reason}
              onPress={() => setSelectedReason(reason)}
              style={StyleSheet.flatten([
                styles.reasonButton,
                selectedReason === reason && styles.selectedReason,
              ])}
            />
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Custom message (optional)"
          value={customMessage}
          onChangeText={setCustomMessage}
        />
        <View style={styles.actions}>
          <CustomButton
            title="Cancel"
            onPress={onClose}
            style={styles.cancelButton}
          />
          <CustomButton
            title="Submit"
            onPress={() => {
              onSubmit(selectedReason, customMessage);
              onClose();
            }}
            style={styles.submitButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
  },
  title: { fontSize: 24, color: "white", fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 16, color: "white", marginBottom: 10 },
  reasonList: { width: "100%", marginBottom: 20 },
  reasonButton: {
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedReason: { backgroundColor: "tomato" },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: { backgroundColor: "gray" },
  submitButton: { backgroundColor: "tomato" },
});

export default FlashNotificationScreen;

import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";

const statuses = [
  { key: "Delivered", color: "#4caf50" },
  { key: "Pickup Ready", color: "#2196f3" },
  { key: "Delayed", color: "#f44336" },
  { key: "Unavailable", color: "#9e9e9e" },
  { key: "In-Route", color: "#ff9800" },
];

const StatusScreen = () => {
  const [currentStatus, setCurrentStatus] = useState("In-Route");

  return (
    <ScrollView style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.header}>
        Current Status:{" "}
        <Text
          style={{ color: statuses.find((s) => s.key === currentStatus)?.color || "#000" }}
        >
          {currentStatus}
        </Text>
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" style={styles.statusContainer}>
        {statuses.map(({ key, color }) => (
          <Card
            key={key}
            style={[
              styles.card,
              currentStatus === key && { backgroundColor: color },
            ]}
          >
            <Card.Content>
              <Text
                style={[
                  styles.statusText,
                  currentStatus === key && { color: "#fff" },
                ]}
              >
                {key}
              </Text>
              <Button
                mode={currentStatus === key ? "contained" : "outlined"}
                onPress={() => setCurrentStatus(key)}
                style={styles.button}
              >
                Select
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  statusContainer: { paddingVertical: 20 },
  card: { marginVertical: 10, padding: 10 },
  statusText: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  button: { alignSelf: "center" },
});

export default StatusScreen;

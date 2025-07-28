import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { List, Card, Text } from "react-native-paper";
import axios from "axios";

const TripScreen = () => {
  const [tripInfo, setTripInfo] = useState({
    currentTrip: { details: "Loading..." },
    previousTrip: { details: "Loading..." },
    nextTrip: { details: "Loading..." },
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/trip_info")
      .then((response) => setTripInfo(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Current Trip</Text>
          <List.Item
            title="Details"
            description={tripInfo.currentTrip.details}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Previous Trip</Text>
          <List.Item
            title="Details"
            description={tripInfo.previousTrip.details}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Next Trip</Text>
          <List.Item title="Details" description={tripInfo.nextTrip.details} />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
  },
});

export default TripScreen;

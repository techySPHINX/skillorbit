import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Card } from "react-native-paper";
import MapView, { Marker, Circle } from "react-native-maps";
import { ProgressChart } from "react-native-chart-kit";
import * as Animatable from "react-native-animatable";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [shippingInfo, setShippingInfo] = useState({
    totalVehicleTonnage: 100,
    vehicleTonnageLeft: 60,
    expectedLoad: 40,
  });

  const chartData = {
    labels: ["Left", "Loaded"], // Labels for the chart
    data: [
      shippingInfo.vehicleTonnageLeft / shippingInfo.totalVehicleTonnage,
      shippingInfo.expectedLoad / shippingInfo.totalVehicleTonnage,
    ],
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/shipping_info")
      .then((response) => setShippingInfo(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Dynamic geofencing */}
        <Circle
          center={{ latitude: 37.78825, longitude: -122.4324 }}
          radius={5000}
          strokeColor="rgba(0,150,255,0.5)"
          fillColor="rgba(0,150,255,0.2)"
        />
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>

      <Animatable.View animation="fadeInUp" style={styles.infoContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              Vehicle Tonnage Progress
            </Text>
            <ProgressChart
              data={chartData}
              width={screenWidth - 40}
              height={200}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                color: (opacity = 1) => `rgba(0, 150, 255, ${opacity})`,
              }}
              hideLegend={false}
            />
          </Card.Content>
        </Card>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 2 },
  infoContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default HomeScreen;

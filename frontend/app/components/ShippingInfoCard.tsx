import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import { typography } from "../assets/styles/typography";
import { spacing } from "../assets/styles/spacing";

interface ShippingInfoCardProps {
  totalTonnage: number;
  remainingTonnage: number;
  expectedLoad: number;
}

const ShippingInfoCard: React.FC<ShippingInfoCardProps> = ({
  totalTonnage,
  remainingTonnage,
  expectedLoad,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#333" }}>
          Shipping Information
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total Tonnage:</Text>
          <Text style={styles.value}>{totalTonnage} T</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Remaining Tonnage:</Text>
          <Text style={styles.value}>{remainingTonnage} T</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Expected Load:</Text>
          <Text style={styles.value}>{expectedLoad} T</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: spacing.medium,
    padding: spacing.medium,
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: spacing.small,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShippingInfoCard;

import React from "react";
import { StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

interface TonnageProgressChartProps {
  totalTonnage: number;
  remainingTonnage: number;
}

const TonnageProgressChart: React.FC<TonnageProgressChartProps> = ({ totalTonnage, remainingTonnage }) => {
  const data = {
    labels: ["Total", "Remaining"],
    datasets: [
      {
        data: [totalTonnage, remainingTonnage],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={320}
        height={220}
        yAxisLabel=""
        yAxisSuffix="T"
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default TonnageProgressChart;

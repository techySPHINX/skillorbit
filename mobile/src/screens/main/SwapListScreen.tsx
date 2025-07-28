// src/screens/main/SwapListScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { getSwaps } from '../../api/swap';
import { Swap } from '../../models/swap'; // Assuming a Swap model exists
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';

const SwapListScreen: React.FC = () => {
  const [swaps, setSwaps] = useState<Swap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const response = await getSwaps();
        setSwaps(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch swaps');
      } finally {
        setLoading(false);
      }
    };

    fetchSwaps();
  }, []);

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>Error: {error}</Text>
      </View>
    );
  }

  const renderSwapItem = ({ item }: { item: Swap }) => (
    <View style={styles.swapCard}>
      <Text style={styles.swapId}>Swap ID: {item._id}</Text>
      <Text style={styles.swapStatus}>Status: {item.status}</Text>
      {/* Add more swap details as needed */}
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>My Swaps</Text>
      <FlatList
        data={swaps}
        keyExtractor={(item) => item._id}
        renderItem={renderSwapItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  swapCard: {
    ...globalStyles.card,
    marginBottom: 10,
  },
  swapId: {
    ...globalStyles.text,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  swapStatus: {
    ...globalStyles.text,
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default SwapListScreen;

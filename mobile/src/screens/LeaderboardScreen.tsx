
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { getLeaderboard } from '../api/gamification';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await getLeaderboard();
      setLeaderboard(response.leaderboard);
    };
    fetchLeaderboard();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.rankText}>#{index + 1}</Text>
      <Image source={{ uri: item.profilePhoto || 'https://via.placeholder.com/50' }} style={styles.profilePhoto} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.levelText}>{item.ascendLevel}</Text>
      </View>
      <Text style={styles.pointsText}>{item.ascendPoints} pts</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 15,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  levelText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
});

export default LeaderboardScreen;

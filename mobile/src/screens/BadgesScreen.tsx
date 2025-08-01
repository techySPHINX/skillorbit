
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { getAllBadges } from '../api/gamification';
import { getMe } from '../api/auth';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';

const BadgesScreen = () => {
  const [allBadges, setAllBadges] = useState([]);
  const [earnedBadgeIds, setEarnedBadgeIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const badgesResponse = await getAllBadges();
      setAllBadges(badgesResponse.badges);

      const userResponse = await getMe();
      setEarnedBadgeIds(userResponse.user.badges.map(badge => badge._id));
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const isEarned = earnedBadgeIds.includes(item._id);
    return (
      <View style={[styles.badgeItem, isEarned ? styles.earnedBadge : styles.unearnedBadge]}>
        <Image source={{ uri: item.icon }} style={styles.badgeIcon} />
        <View style={styles.badgeInfo}>
          <Text style={styles.badgeName}>{item.name}</Text>
          <Text style={styles.badgeDescription}>{item.description}</Text>
          <Text style={styles.badgeCriteria}>Criteria: {item.criteria}</Text>
          {isEarned && <Text style={styles.earnedText}>EARNED!</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Badges</Text>
      <FlatList
        data={allBadges}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        numColumns={2} // Display in 2 columns
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  badgeItem: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  earnedBadge: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  unearnedBadge: {
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    opacity: 0.6,
  },
  badgeIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  badgeInfo: {
    alignItems: 'center',
  },
  badgeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 5,
  },
  badgeDescription: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 5,
  },
  badgeCriteria: {
    fontSize: 12,
    color: COLORS.textDark,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  earnedText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default BadgesScreen;

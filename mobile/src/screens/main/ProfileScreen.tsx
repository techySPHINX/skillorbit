// src/screens/main/ProfileScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, RootState } from '../../redux';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../navigation/MainNavigator';

type ProfileScreenRouteProp = RouteProp<MainStackParamList, 'Profile'>;

interface Props {
  route: ProfileScreenRouteProp;
}

const ProfileScreen: React.FC<Props> = ({ route }) => {
  const { userId } = route.params;
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {profile && (
        <View style={styles.profileInfo}>
          <Text style={styles.profileText}>Username: {profile.username}</Text>
          <Text style={styles.profileText}>Email: {profile.email}</Text>
          {profile.location && <Text style={styles.profileText}>Location: {profile.location}</Text>}
          {profile.availability && <Text style={styles.profileText}>Availability: {profile.availability}</Text>}
          {profile.skillsOffered.length > 0 && (
            <Text style={styles.profileText}>Skills Offered: {profile.skillsOffered.join(', ')}</Text>
          )}
          {profile.skillsWanted.length > 0 && (
            <Text style={styles.profileText}>Skills Wanted: {profile.skillsWanted.join(', ')}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...globalStyles.title,
    marginBottom: 20,
  },
  profileInfo: {
    ...globalStyles.card,
    width: '90%',
    alignItems: 'flex-start',
  },
  profileText: {
    ...globalStyles.text,
    marginBottom: 5,
  },
});

export default ProfileScreen;

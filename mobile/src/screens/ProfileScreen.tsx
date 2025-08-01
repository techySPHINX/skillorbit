
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { updateProfile, updateProfilePhoto } from '../api/user';
import { getMe } from '../api/auth';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getMe();
      setUser(response.user);
      setUsername(response.user.username);
      setLocation(response.user.location);
      setAvailability(response.user.availability);
      setSkillsOffered(response.user.skillsOffered || []);
      setSkillsWanted(response.user.skillsWanted || []);
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    await updateProfile({ username, location, availability });
    alert('Profile updated!');
  };

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      await updateProfilePhoto(result.uri);
      alert('Profile photo updated!');
    }
  };

  if (!user) {
    return <Text style={globalStyles.text}>Loading...</Text>;
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>My Profile</Text>

      <View style={styles.profileImageContainer}>
        <Image source={{ uri: user.profilePhoto }} style={styles.profileImage} />
        <TouchableOpacity style={globalStyles.buttonSecondary} onPress={handleChoosePhoto}>
          <Text style={globalStyles.buttonSecondaryText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.card}>
        <Text style={styles.sectionTitle}>Gamification Stats</Text>
        <Text style={globalStyles.text}>Ascend Points: {user.ascendPoints}</Text>
        <Text style={globalStyles.text}>Ascend Level: {user.ascendLevel}</Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={styles.sectionTitle}>Badges Earned</Text>
        {user.badges && user.badges.length > 0 ? (
          user.badges.map((badge: any, index: number) => (
            <View key={index} style={styles.badgeItem}>
              <Image source={{ uri: badge.icon }} style={styles.badgeIcon} />
              <Text style={styles.badgeName}>{badge.name}</Text>
            </View>
          ))
        ) : (
          <Text style={globalStyles.text}>No badges earned yet.</Text>
        )}
      </View>

      <View style={globalStyles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Username"
          placeholderTextColor={COLORS.gray}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Location"
          placeholderTextColor={COLORS.gray}
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Availability"
          placeholderTextColor={COLORS.gray}
          value={availability}
          onChangeText={setAvailability}
        />
        <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleUpdateProfile}>
          <Text style={globalStyles.buttonPrimaryText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.card}>
        <Text style={styles.sectionTitle}>Skills Offered</Text>
        {skillsOffered.length > 0 ? (
          skillsOffered.map((skill, index) => (
            <Text key={index} style={globalStyles.text}>- {skill.name}</Text>
          ))
        ) : (
          <Text style={globalStyles.text}>No skills offered yet.</Text>
        )}
      </View>

      <View style={globalStyles.card}>
        <Text style={styles.sectionTitle}>Skills Wanted</Text>
        {skillsWanted.length > 0 ? (
          skillsWanted.map((skill, index) => (
            <Text key={index} style={globalStyles.text}>- {skill.name}</Text>
          ))
        ) : (
          <Text style={globalStyles.text}>No skills wanted yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  badgeIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  badgeName: {
    fontSize: 16,
    color: COLORS.textDark,
  },
});

export default ProfileScreen;

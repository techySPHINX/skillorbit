// src/screens/main/CreateSwapScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';
import CustomButton from '../../components/CustomButton';
import { getSkills } from '../../api/skill';
import { getUsers } from '../../api/admin'; // Assuming admin API can list users for now
import { requestSwap } from '../../api/swap';
import { Skill } from '../../models/skill';
import { UserProfile } from '../../models/user';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/MainNavigator';

type CreateSwapScreenNavigationProp = StackNavigationProp<MainStackParamList, 'CreateSwap'>;

interface Props {
  navigation: CreateSwapScreenNavigationProp;
}

const CreateSwapScreen: React.FC<Props> = ({ navigation }) => {
  const [responder, setResponder] = useState<string>('');
  const [skillOffered, setSkillOffered] = useState<string>('');
  const [skillWanted, setSkillWanted] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState<string>('');

  const [skills, setSkills] = useState<Skill[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsResponse = await getSkills();
        setSkills(skillsResponse.data);

        // In a real app, you'd have a dedicated API for listing users for swaps
        // For now, using admin API as a placeholder
        const usersResponse = await getUsers();
        setUsers(usersResponse.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!responder || !skillOffered || !skillWanted) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('responder', responder);
      formData.append('skillOffered', skillOffered);
      formData.append('skillWanted', skillWanted);
      if (scheduledTime) {
        formData.append('scheduledTime', scheduledTime);
      }

      await requestSwap(formData);
      Alert.alert('Success', 'Swap request sent!');
      navigation.goBack();
    } catch (err: any) {
      setError(err.message || 'Failed to send swap request');
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Request New Swap</Text>

      <Text style={styles.label}>Swap With:</Text>
      <Picker
        selectedValue={responder}
        onValueChange={(itemValue) => setResponder(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select User" value="" />
        {users.map((user) => (
          <Picker.Item key={user._id} label={user.username} value={user._id} />
        ))}
      </Picker>

      <Text style={styles.label}>Skill You Offer:</Text>
      <Picker
        selectedValue={skillOffered}
        onValueChange={(itemValue) => setSkillOffered(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Skill" value="" />
        {skills.map((skill) => (
          <Picker.Item key={skill._id} label={skill.name} value={skill._id} />
        ))}
      </Picker>

      <Text style={styles.label}>Skill You Want:</Text>
      <Picker
        selectedValue={skillWanted}
        onValueChange={(itemValue) => setSkillWanted(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Skill" value="" />
        {skills.map((skill) => (
          <Picker.Item key={skill._id} label={skill.name} value={skill._id} />
        ))}
      </Picker>

      <Text style={styles.label}>Scheduled Time (Optional):</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="YYYY-MM-DDTHH:MM:SSZ (e.g., 2025-12-31T10:00:00Z)"
        placeholderTextColor={COLORS.gray}
        value={scheduledTime}
        onChangeText={setScheduledTime}
      />

      {error && <Text style={globalStyles.text}>Error: {error}</Text>}

      <CustomButton
        title={submitting ? 'Submitting...' : 'Request Swap'}
        onPress={handleSubmit}
        disabled={submitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...globalStyles.text,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
});

export default CreateSwapScreen;

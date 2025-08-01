
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { listSwaps, requestSwap, changeSwapStatus } from '../api/swap';
import { listUsers } from '../api/user'; // Assuming you have a listUsers API for selecting responder
import { listSkills } from '../api/skill'; // Assuming you have a listSkills API for selecting skills
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';

const SwapScreen = () => {
  const [swaps, setSwaps] = useState([]);
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [responder, setResponder] = useState('');
  const [skillOffered, setSkillOffered] = useState('');
  const [skillWanted, setSkillWanted] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const swapsResponse = await listSwaps();
      setSwaps(swapsResponse.swaps);
      const usersResponse = await listUsers(); // Fetch users for responder selection
      setUsers(usersResponse.users);
      const skillsResponse = await listSkills(); // Fetch skills for skill selection
      setSkills(skillsResponse.skills);
    };
    fetchData();
  }, []);

  const handleRequestSwap = async () => {
    await requestSwap({ responder, skillOffered, skillWanted });
    alert('Swap requested!');
    // Refresh the list
    const swapsResponse = await listSwaps();
    setSwaps(swapsResponse.swaps);
  };

  const handleChangeStatus = async (id, status) => {
    await changeSwapStatus(id, status);
    alert('Swap status updated!');
    // Refresh the list
    const swapsResponse = await listSwaps();
    setSwaps(swapsResponse.swaps);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Swaps</Text>
      <View style={globalStyles.card}>
        <Text style={globalStyles.text}>Request a New Swap</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Responder User ID"
          placeholderTextColor={COLORS.gray}
          value={responder}
          onChangeText={setResponder}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Skill Offered ID"
          placeholderTextColor={COLORS.gray}
          value={skillOffered}
          onChangeText={setSkillOffered}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Skill Wanted ID"
          placeholderTextColor={COLORS.gray}
          value={skillWanted}
          onChangeText={setSkillWanted}
        />
        <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleRequestSwap}>
          <Text style={globalStyles.buttonPrimaryText}>Request Swap</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={swaps}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[globalStyles.card, styles.swapCard, styles[`status${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`]]}>
            <Text style={styles.swapTitle}>Swap Request</Text>
            <Text style={globalStyles.text}>Offered: {item.skillOffered.name}</Text>
            <Text style={globalStyles.text}>Wanted: {item.skillWanted.name}</Text>
            <Text style={globalStyles.text}>Status: <Text style={styles.statusText}>{item.status}</Text></Text>
            {item.status === 'pending' && (
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={globalStyles.buttonPrimary} onPress={() => handleChangeStatus(item._id, 'accepted')}>
                  <Text style={globalStyles.buttonPrimaryText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => handleChangeStatus(item._id, 'rejected')}>
                  <Text style={globalStyles.buttonSecondaryText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  swapCard: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  swapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 5,
  },
  statusText: {
    fontWeight: 'bold',
  },
  statusPending: {
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  statusAccepted: {
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  statusRejected: {
    borderColor: COLORS.danger,
    borderWidth: 1,
  },
  statusCompleted: {
    borderColor: COLORS.textDark,
    borderWidth: 1,
  },
});

export default SwapScreen;

// src/screens/main/HomeScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { logout, RootState } from '../../redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/MainNavigator';

type HomeScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username}!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={globalStyles.buttonPrimary}
          onPress={() => user && navigation.navigate('Profile', { userId: user._id })}
        >
          <Text style={globalStyles.buttonPrimaryText}>Go to My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.buttonSecondary}
          onPress={() => navigation.navigate('SkillList')}
        >
          <Text style={globalStyles.buttonSecondaryText}>View All Skills</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.buttonSecondary}
          onPress={() => navigation.navigate('SwapList')}
        >
          <Text style={globalStyles.buttonSecondaryText}>View My Swaps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.buttonSecondary}
          onPress={() => navigation.navigate('CreateSwap')}
        >
          <Text style={globalStyles.buttonSecondaryText}>Request New Swap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.buttonSecondary}
          onPress={handleLogout}
        >
          <Text style={globalStyles.buttonSecondaryText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});

export default HomeScreen;

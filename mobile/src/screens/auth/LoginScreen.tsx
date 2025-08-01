// src/screens/auth/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, RootState } from '../../redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <LinearGradient
      colors={[COLORS.backgroundLight, COLORS.white]}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.contentContainer}>
        {/* Placeholder for Logo/Branding */}
        <Image
          source={require('../../assets/logo.png')} // Assuming a logo.png in assets
          style={styles.logo}
        />
        <Text style={globalStyles.title}>Welcome Back!</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.gray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.gray}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity
          style={globalStyles.buttonPrimary}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={globalStyles.buttonPrimaryText}>
            {loading ? 'Loading...' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.linkButtonText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  error: {
    color: COLORS.danger,
    marginBottom: 10,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 15,
  },
  linkButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;

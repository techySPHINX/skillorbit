// src/screens/auth/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.gray}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.gray}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.buttonContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    ...globalStyles.title,
    fontSize: 28, // Slightly larger for a prominent title
    marginBottom: 30,
  },
  input: {
    ...globalStyles.input,
    width: '100%',
  },
  error: {
    color: COLORS.danger,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
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

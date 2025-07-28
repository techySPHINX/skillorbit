// src/screens/auth/RegisterScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, RootState } from '../../redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = () => {
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={COLORS.gray}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
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
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={globalStyles.buttonPrimaryText}>
            {loading ? 'Loading...' : 'Register'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkButtonText}>Already have an account? Login</Text>
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
    fontSize: 28,
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

export default RegisterScreen;

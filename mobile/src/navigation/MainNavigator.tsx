// src/navigation/MainNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/main/HomeScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

import SkillListScreen from '../screens/main/SkillListScreen';
import SwapListScreen from '../screens/main/SwapListScreen';
import CreateSwapScreen from '../screens/main/CreateSwapScreen';
import NotificationScreen from '../screens/main/NotificationScreen';

export type MainStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  SkillList: undefined;
  SwapList: undefined;
  CreateSwap: undefined;
  Notification: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SkillList" component={SkillListScreen} />
      <Stack.Screen name="SwapList" component={SwapListScreen} />
      <Stack.Screen name="CreateSwap" component={CreateSwapScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

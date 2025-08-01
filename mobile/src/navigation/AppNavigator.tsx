import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import SkillScreen from '../screens/SkillScreen';
import SwapScreen from '../screens/SwapScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Skills" component={SkillScreen} />
      <Stack.Screen name="Swaps" component={SwapScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
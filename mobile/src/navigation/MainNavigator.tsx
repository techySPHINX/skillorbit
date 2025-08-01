import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import SkillScreen from '../screens/SkillScreen';
import SwapScreen from '../screens/SwapScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import NotificationScreen from '../screens/NotificationScreen';

import LeaderboardScreen from '../screens/LeaderboardScreen';
import BadgesScreen from '../screens/BadgesScreen';

export type MainStackParamList = {
  Profile: undefined;
  Skills: undefined;
  Swaps: undefined;
  Feedback: { userId: string };
  Notifications: undefined;
  Leaderboard: undefined;
  Badges: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen name="Skills" component={SkillScreen} />
      <MainStack.Screen name="Swaps" component={SwapScreen} />
      <MainStack.Screen name="Feedback" component={FeedbackScreen} />
      <MainStack.Screen name="Notifications" component={NotificationScreen} />
      <MainStack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <MainStack.Screen name="Badges" component={BadgesScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
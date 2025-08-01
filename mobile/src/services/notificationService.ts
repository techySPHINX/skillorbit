// src/services/notificationService.ts

import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class NotificationService {
  constructor() {
    this.configureNotifications();
  }

  private configureNotifications = () => {
    // Request permission for notifications
    this.requestUserPermission();

    // Handle foreground messages
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);
      // You can display a local notification here
    });

    // Handle background/quit messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background/Quit Message:', remoteMessage);
      // Perform background tasks or display local notification
    });

    // Handle notification opened from quit state
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification opened from quit state:', remoteMessage);
        // Navigate to a specific screen or handle data
      }
    });

    // Handle notification opened from background state
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('Notification opened from background state:', remoteMessage);
      // Navigate to a specific screen or handle data
    });
  };

  private requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      this.getFCMToken();
    } else {
      console.log('Failed to get authorization status');
    }
  };

  private getFCMToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('Your Firebase Token is:', fcmToken);
        // Send this token to your backend server
        this.sendFCMTokenToBackend(fcmToken);
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  // You can add methods here to subscribe/unsubscribe to topics
  public subscribeToTopic = async (topic: string) => {
    await messaging().subscribeToTopic(topic);
    console.log(`Subscribed to topic: ${topic}`);
  };

  public unsubscribeFromTopic = async (topic: string) => {
    await messaging().unsubscribeFromTopic(topic);
    console.log(`Unsubscribed from topic: ${topic}`);
  };

  private sendFCMTokenToBackend = async (token: string) => {
    try {
      import { registerFCMToken } from '../api/user';
      try {
        await registerFCMToken(token);
        console.log('FCM Token sent to backend successfully:', token);
      } catch (error) {
        console.error('Failed to send FCM token to backend:', error);
      }
    } catch (error) {
      console.error('Failed to send FCM token to backend:', error);
    }
  };
}

export const notificationService = new NotificationService();

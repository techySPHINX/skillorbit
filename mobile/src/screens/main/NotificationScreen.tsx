// src/screens/main/NotificationScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, markNotificationAsRead } from '../../redux';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';
import { getNotifications } from '../../api/notification';
import { setNotifications } from '../../redux/notificationSlice';

const NotificationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        dispatch(setNotifications(response.data));
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };
    fetchNotifications();
  }, [dispatch]);

  const handlePressNotification = (notificationId: string) => {
    dispatch(markNotificationAsRead(notificationId));
    // Optionally navigate to a specific screen based on notification content
  };

  const renderNotificationItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.notificationCard, item.isRead ? styles.read : styles.unread]}
      onPress={() => handlePressNotification(item._id)}
    >
      <Text style={styles.notificationText}>{item.message}</Text>
      <Text style={styles.notificationTime}>{new Date(item.createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Notifications</Text>
      {notifications.length === 0 ? (
        <Text style={globalStyles.text}>No new notifications.</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={renderNotificationItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  notificationCard: {
    ...globalStyles.card,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unread: {
    backgroundColor: COLORS.backgroundLight,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  read: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
  },
  notificationText: {
    ...globalStyles.text,
    flex: 1,
  },
  notificationTime: {
    ...globalStyles.text,
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 10,
  },
});

export default NotificationScreen;

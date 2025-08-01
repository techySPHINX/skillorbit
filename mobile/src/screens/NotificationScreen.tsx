
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { listNotifications, readNotification } from '../api/notification';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await listNotifications();
      setNotifications(response.notifications);
    };
    fetchNotifications();
  }, []);

  const handleReadNotification = async (id) => {
    await readNotification(id);
    // Refresh the list
    const response = await listNotifications();
    setNotifications(response.notifications);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[globalStyles.card, styles.notificationItem, item.isRead ? styles.readNotification : styles.unreadNotification]}>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationTimestamp}>{new Date(item.createdAt).toLocaleString()}</Text>
            {!item.isRead && (
              <TouchableOpacity style={globalStyles.buttonPrimary} onPress={() => handleReadNotification(item._id)}>
                <Text style={globalStyles.buttonPrimaryText}>Mark as Read</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
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
  notificationMessage: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 5,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 10,
  },
  readNotification: {
    opacity: 0.7,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
});

export default NotificationScreen;

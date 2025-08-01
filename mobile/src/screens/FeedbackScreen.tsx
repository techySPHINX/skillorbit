
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { leaveFeedback, getUserFeedback } from '../api/feedback';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';

const FeedbackScreen = ({ route }) => {
  const { userId } = route.params;
  const [swapId, setSwapId] = useState('');
  const [toUser, setToUser] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [feedback, setFeedback] = useState([]);

  const handleLeaveFeedback = async () => {
    await leaveFeedback({ swap: swapId, toUser, rating: parseInt(rating), comment });
    alert('Feedback left!');
    setSwapId('');
    setToUser('');
    setRating('5');
    setComment('');
  };

  const handleGetUserFeedback = async () => {
    const response = await getUserFeedback(userId);
    setFeedback(response.feedback);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Feedback</Text>
      <View style={globalStyles.card}>
        <Text style={globalStyles.text}>Leave Feedback</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Swap ID"
          placeholderTextColor={COLORS.gray}
          value={swapId}
          onChangeText={setSwapId}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="To User ID"
          placeholderTextColor={COLORS.gray}
          value={toUser}
          onChangeText={setToUser}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Rating (1-5)"
          placeholderTextColor={COLORS.gray}
          value={rating}
          onChangeText={setRating}
          keyboardType="numeric"
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Comment"
          placeholderTextColor={COLORS.gray}
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleLeaveFeedback}>
          <Text style={globalStyles.buttonPrimaryText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={globalStyles.buttonSecondary} onPress={handleGetUserFeedback}>
        <Text style={globalStyles.buttonSecondaryText}>View User Feedback</Text>
      </TouchableOpacity>
      <FlatList
        data={feedback}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[globalStyles.card, styles.feedbackItem]}>
            <Text style={styles.feedbackRating}>Rating: {item.rating}/5</Text>
            <Text style={globalStyles.text}>Comment: {item.comment}</Text>
            <Text style={styles.feedbackUser}>From: {item.fromUser.username}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackItem: {
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
  feedbackRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  feedbackUser: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
});

export default FeedbackScreen;

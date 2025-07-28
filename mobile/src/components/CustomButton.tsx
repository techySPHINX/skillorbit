// src/components/CustomButton.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = type === 'primary' ? globalStyles.buttonPrimary : globalStyles.buttonSecondary;
  const buttonTextStyle = type === 'primary' ? globalStyles.buttonPrimaryText : globalStyles.buttonSecondaryText;

  return (
    <TouchableOpacity
      style={[buttonStyle, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[buttonTextStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.6,
  },
});

export default CustomButton;

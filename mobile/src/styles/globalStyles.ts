// src/styles/globalStyles.ts

import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

/**
 * Global styles for the SkillOrbit application.
 *
 * This file defines common styles that can be applied across various components
 * and screens to maintain a consistent look and feel.
 */
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
  },
  text: {
    color: COLORS.textDark,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 48,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonPrimaryText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonSecondaryText: {
    color: COLORS.textDark,
    fontSize: 18,
    fontWeight: '600',
  },
});

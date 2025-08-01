
import User, { IUser } from '../models/User';
import Badge, { IBadge } from '../models/Badge';
import { logger } from '../config/logger';

// Define point values for various actions
const POINTS_CONFIG = {
  SWAP_COMPLETED: 50,
  FEEDBACK_GIVEN: 10,
  SKILL_CREATED: 5,
  DAILY_LOGIN: 1,
  // Add more actions as needed
};

// Define level thresholds
const LEVEL_THRESHOLDS = [
  { level: 'Novice', points: 0 },
  { level: 'Apprentice', points: 100 },
  { level: 'Journeyman', points: 500 },
  { level: 'Master', points: 1500 },
  { level: 'Grandmaster', points: 3000 },
  // Add more levels as needed
];

export const addPoints = async (userId: string, actionType: keyof typeof POINTS_CONFIG) => {
  try {
    const pointsToAdd = POINTS_CONFIG[actionType];
    if (pointsToAdd === undefined) {
      logger.warn(`Unknown action type for gamification: ${actionType}`);
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      logger.error(`User not found for gamification: ${userId}`);
      return;
    }

    user.ascendPoints += pointsToAdd;
    await updateAscendLevel(user);
    await user.save();
    logger.info(`Added ${pointsToAdd} points to user ${userId} for ${actionType}. Total points: ${user.ascendPoints}`);
  } catch (error) {
    logger.error(`Error adding points to user ${userId}:`, error);
  }
};

export const updateAscendLevel = async (user: IUser) => {
  let newLevel = user.ascendLevel;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (user.ascendPoints >= LEVEL_THRESHOLDS[i].points) {
      newLevel = LEVEL_THRESHOLDS[i].level;
      break;
    }
  }
  if (user.ascendLevel !== newLevel) {
    user.ascendLevel = newLevel;
    logger.info(`User ${user._id} leveled up to ${newLevel}`);
    // TODO: Emit a socket event for level up notification
  }
};

export const awardBadge = async (userId: string, badgeName: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      logger.error(`User not found for badge awarding: ${userId}`);
      return;
    }

    const badge = await Badge.findOne({ name: badgeName });
    if (!badge) {
      logger.error(`Badge not found: ${badgeName}`);
      return;
    }

    if (!user.badges.includes(badge._id)) {
      user.badges.push(badge._id);
      user.ascendPoints += badge.pointsAwarded; // Award points for earning a badge
      await updateAscendLevel(user);
      await user.save();
      logger.info(`User ${userId} awarded badge: ${badgeName}. Points awarded: ${badge.pointsAwarded}`);
      // TODO: Emit a socket event for badge awarded notification
    } else {
      logger.info(`User ${userId} already has badge: ${badgeName}`);
    }
  } catch (error) {
    logger.error(`Error awarding badge ${badgeName} to user ${userId}:`, error);
  }
};

export const getLeaderboard = async (limit: number = 10) => {
  try {
    return await User.find({}).sort({ ascendPoints: -1 }).limit(limit).select('username ascendPoints ascendLevel profilePhoto').lean();
  } catch (error) {
    logger.error('Error getting leaderboard:', error);
    throw new Error('Failed to retrieve leaderboard.');
  }
};

export const getAllBadges = async () => {
  try {
    return await Badge.find({}).lean();
  } catch (error) {
    logger.error('Error getting all badges:', error);
    throw new Error('Failed to retrieve badges.');
  }
};

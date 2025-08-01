
import { Router } from 'express';
import { getLeaderboard, getBadges } from '../controllers/gamificationController';
import { apiLimiter } from '../middlewares/rateLimiter';

const router = Router();

// Apply the rate limiter to all gamification routes
router.use(apiLimiter);

/**
 * @route GET /gamification/leaderboard
 * @desc Get the global leaderboard
 * @access Public
 */
router.get('/leaderboard', getLeaderboard);

/**
 * @route GET /gamification/badges
 * @desc Get all available badges
 * @access Public
 */
router.get('/badges', getBadges);

export default router;

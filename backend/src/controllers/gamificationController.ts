
import { Request, Response, NextFunction } from 'express';
import { getLeaderboard as getLeaderboardService, getAllBadges as getAllBadgesService } from '../services/gamificationService';

export const getLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leaderboard = await getLeaderboardService();
    res.json({ leaderboard });
  } catch (error) {
    next(error);
  }
};

export const getBadges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const badges = await getAllBadgesService();
    res.json({ badges });
  } catch (error) {
    next(error);
  }
};

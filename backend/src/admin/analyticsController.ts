import { Request, Response, NextFunction } from 'express'
import {
  getUserCount,
  getSwapStats,
  getPopularSkills,
} from '../services/analyticsService'
import { runAnalyticsJob } from '../jobs/analyticsJob'
import { logger } from '../config/logger'

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCount = await getUserCount()
    const swapStats = await getSwapStats()
    const popularSkills = await getPopularSkills()

    logger.info('Fetched analytics summary.')

    res.json({ userCount, swapStats, popularSkills })
  } catch (err) {
    logger.error('Error fetching analytics summary:', err)
    next(err)
  }
}

export const downloadAnalyticsReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await runAnalyticsJob()

    logger.info('Analytics report generation triggered.')

    res.json({ message: 'Analytics report generation initiated.' })
  } catch (err) {
    logger.error('Error generating analytics report:', err)
    next(err)
  }
}

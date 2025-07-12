import { Request, Response, NextFunction } from 'express'
import {
  getUserCount,
  getSwapStats,
  getPopularSkills,
} from '../services/analyticsService'
import { runAnalyticsJob } from '../jobs/analyticsJob'
import { logger } from '../config/logger'

export const getDashboardSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCount = await getUserCount()
    const swapStats = await getSwapStats()
    const popularSkills = await getPopularSkills()

    logger.info('Fetched dashboard summary data.')

    res.json({ userCount, swapStats, popularSkills })
  } catch (err) {
    logger.error('Error fetching dashboard summary:', err)
    next(err)
  }
}
export const exportAnalyticsReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await runAnalyticsJob()

    logger.info('Analytics report generation and export triggered.')

    res.json({ message: 'Analytics report generation initiated.' })
  } catch (err) {
    logger.error('Error generating/exporting analytics report:', err)
    next(err)
  }
}

import { logger } from '../config/logger'
import { User, Swap, Skill } from '../models'

/**
 * Generates and logs analytics reports.
 * Extend this to export as CSV/PDF or send via email.
 */
export const runAnalyticsJob = async () => {
  try {
    const userCount = await User.countDocuments()
    const swapCount = await Swap.countDocuments()
    const skillCount = await Skill.countDocuments()
    logger.info('Analytics Report', { userCount, swapCount, skillCount })
  } catch (err) {
    logger.error('Analytics job failed', err)
  }
}

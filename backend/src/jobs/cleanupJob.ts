import { logger } from '../config/logger'
import { Swap } from '../models'

/**
 * Cleans up old or expired swap requests.
 */
export const runCleanupJob = async () => {
  try {
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const result = await Swap.deleteMany({
      status: 'pending',
      createdAt: { $lt: cutoff },
    })
    logger.info(`Cleanup job removed ${result.deletedCount} old pending swaps`)
  } catch (err) {
    logger.error('Cleanup job failed', err)
  }
}

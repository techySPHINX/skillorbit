import { Request, Response, NextFunction } from 'express'
import { getAdminLogs } from '../services/adminService'
import { logger } from '../config/logger'

export const getLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const logs = await getAdminLogs(req.query)

    logger.info('Fetched admin logs.', {
      count: logs.length,
      filter: req.query,
    })

    res.json({ logs })
  } catch (err) {
    logger.error('Error fetching admin logs:', err)
    next(err)
  }
}

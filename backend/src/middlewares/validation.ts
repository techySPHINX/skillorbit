import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

export const validateBody =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        details: error.details.map(d => d.message),
      })
    }
    next()
  }

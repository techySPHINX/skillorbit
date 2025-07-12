import Filter from 'bad-words'
import { logger } from '../config/logger'

const filter = new (Filter as any)()

export const containsProfanity = (text: string): boolean => {
  if (typeof text !== 'string') return false
  const result = filter.isProfane(text)
  if (result) logger.warn(`Profanity detected in text: ${text}`)
  return result
}

export const cleanText = (text: string): string => {
  if (typeof text !== 'string') return text
  return filter.clean(text)
}

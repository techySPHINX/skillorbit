import { Filter } from "bad-words/dist/badwords"

const filter = new (Filter as any)()

export const containsProfanity = (text: string): boolean => {
  if (typeof text !== 'string') return false
  return filter.isProfane(text)
}

export const cleanText = (text: string): string => {
  if (typeof text !== 'string') return text
  return filter.clean(text)
}



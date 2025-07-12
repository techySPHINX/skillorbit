/**
 * Picks allowed fields from an object.
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) result[key] = obj[key]
  })
  return result
}

export const generateRandomString = (length = 32): string => {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 36).toString(36))
    .join('')
}

/**
 * Sleep for a given number of milliseconds (async).
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

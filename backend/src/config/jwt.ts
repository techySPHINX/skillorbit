import jwt, { SignOptions, Secret } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as Secret
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export const signJwt = (
  payload: string | object | Buffer,
  options?: SignOptions
): string => {
  const signOptions: SignOptions = {
    ...options,
    expiresIn: JWT_EXPIRES_IN as unknown as SignOptions['expiresIn'],
  }

  return jwt.sign(payload, JWT_SECRET, signOptions)
}

export const verifyJwt = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}

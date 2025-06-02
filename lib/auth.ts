// lib/auth.ts
import jwt from 'jsonwebtoken'

export function getUserFromToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string }
  } catch {
    return null
  }
}

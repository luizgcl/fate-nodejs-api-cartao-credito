import { env } from '@/env/Env'
import type { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'

export function handleCreateToken(user: User) {
  const payload = {
    email: user.email,
  }

  const token = sign(payload, env.SECRET, {
    issuer: 'CREDIT-API',
    algorithm: 'HS256',
    expiresIn: '1h',
    subject: user.email,
  })

  return {
    access_token: token,
  }
}

import { env } from '@/env/Env'
import type { User } from '@prisma/client'
import { type JwtPayload, sign, verify } from 'jsonwebtoken'

export function handleCreateToken(user: User) {
  const payload = {
    userDocument: user.cpf,
  }

  const token = sign(payload, env.SECRET, {
    issuer: 'CREDIT-API',
    algorithm: 'HS256',
    expiresIn: '1h',
    subject: user.cpf,
  })

  return {
    access_token: token,
  }
}

export function handleValidateToken(token: string): { payload: JwtPayload } {
  const payload = verify(token, env.SECRET, {
    issuer: 'CREDIT-API',
  }) as JwtPayload

  return { payload }
}

import { env } from '@/env/Env'
import type { Card } from '@prisma/client'
import { type JwtPayload, sign, verify } from 'jsonwebtoken'

export function handleCreateToken(card: Card) {
  const payload = {
    code: card.code,
  }

  const token = sign(payload, env.SECRET, {
    issuer: 'CREDIT-API',
    algorithm: 'HS256',
    expiresIn: '1h',
    subject: card.cpf,
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

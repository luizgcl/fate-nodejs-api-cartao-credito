import { InvalidCredentialsError } from '@/core/errors/InvalidCredentialsError'
import { Exception } from '@/core/errors/bases/Exception'
import { env } from '@/env/Env'
import type { NextFunction, Request, Response } from 'express'
import { handleValidateToken } from '../services/TokenService'

export async function handleAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization?.substring(7)

  if (!authorization) {
    throw new InvalidCredentialsError()
  }

  try {
    const { payload } = handleValidateToken(authorization)

    request.userId = payload.userId
  } catch (error) {
    if (error instanceof Error && env.DEBUG) {
      throw new Exception(
        error.message.replace(' ', '_').toUpperCase(),
        error.message
      )
    }

    throw new InvalidCredentialsError()
  }

  return next()
}

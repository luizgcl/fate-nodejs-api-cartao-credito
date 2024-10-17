import { InvalidCredentialsException } from '@/core/errors/InvalidCredentialsException'
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
    throw new InvalidCredentialsException()
  }

  try {
    const { payload } = handleValidateToken(authorization)

    request.userDocument = payload.userDocument
  } catch (error) {
    if (error instanceof Error && env.DEBUG) {
      throw new Exception(
        error.message.replace(' ', '_').toUpperCase(),
        error.message
      )
    }

    throw new InvalidCredentialsException()
  }

  return next()
}

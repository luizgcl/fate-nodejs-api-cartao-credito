import { HttpStatus } from '@/core/constants/HttpStatus'
import type { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { ZodError } from 'zod'

export async function handleError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      data: error.flatten().fieldErrors,
      code: 'VALIDATION_ERROR',
    })
  }

  return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    data: error.message,
    code: 'INTERNAL_SERVER_ERROR',
  })
}

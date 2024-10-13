import { HttpStatus } from '@/core/constants/HttpStatus'
import type { Request, Response, Router } from 'express'
import * as AuthService from '../services/AuthService'

export function bootstrap(router: Router) {
  router.post('/register', async (req: Request, res: Response) => {
    await AuthService.register(req.body)
    return res.status(HttpStatus.CREATED).send()
  })

  return router
}

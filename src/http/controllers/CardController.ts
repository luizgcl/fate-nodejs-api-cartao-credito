import { HttpStatus } from '@/core/constants/HttpStatus'
import type { Request, Response, Router } from 'express'
import * as CardService from '../services/CardService'

export function bootstrap(router: Router) {
  router.post('/', async (req: Request, res: Response) => {
    await CardService.createCard({
      ...req.body,
      cpf: req.userDocument,
    })
    return res.status(HttpStatus.CREATED).send()
  })

  router.post('/validate', async (req: Request, res: Response) => {
    const token = await CardService.validateCard({
      ...req.body,
      cpf: req.userDocument,
    })
    return res.json(token)
  })

  return router
}

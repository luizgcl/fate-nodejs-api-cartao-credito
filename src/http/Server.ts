import { env } from '@/env/Env'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import * as AuthController from './controllers/AuthController'
import { handleError } from './middlewares/ErrorHandler'

export function startServer() {
  const app = express()
  const router = express.Router()

  app.use(express.json())
  app.use(
    cors({
      origin: '*',
    })
  )

  app.use('/auth', AuthController.bootstrap(router))

  app.use(handleError)

  app.listen(env.PORT, () => {
    console.log('Server HTTP is running!')
  })
}

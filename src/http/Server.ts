import { env } from '@/env/Env'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import { handleError } from './middlewares/ErrorHandler'

export function startServer() {
  const app = express()

  app.use(express.json())
  app.use(
    cors({
      origin: '*',
    })
  )

  app.use(handleError)

  app.listen(env.PORT, () => {
    console.log('Server HTTP is running!')
  })
}

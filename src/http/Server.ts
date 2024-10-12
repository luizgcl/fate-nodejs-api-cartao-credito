import { env } from '@/env/Env'
import cors from 'cors'
import express from 'express'

export function startServer() {
  const app = express()

  app.use(
    cors({
      origin: '*',
    })
  )

  app.listen(env.PORT, () => {
    console.log('Server HTTP is running!')
  })
}

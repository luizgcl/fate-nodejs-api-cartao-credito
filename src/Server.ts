import cors from 'cors'
import express from 'express'
import { env } from './env/env'

const app = express()

app.use(
  cors({
    origin: '*',
  })
)

app.listen(env.PORT, () => {
  console.log('Server HTTP is running!')
})

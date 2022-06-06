import { useMiddlewares } from './middlewares'
import { useRoutes } from './routes'

import express from 'express'

const app = express()

useMiddlewares(app)
useRoutes(app)

export { app }

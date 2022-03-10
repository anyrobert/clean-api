import { useMiddlewares } from './middlewares'

import express from 'express'

const app = express()

useMiddlewares(app)

export { app }

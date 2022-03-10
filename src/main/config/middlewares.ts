import { bodyParser, cors } from '@/main/middlewares'

import { Express } from 'express'

export const useMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}

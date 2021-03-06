import { app } from '@/main/config'

import request from 'supertest'

describe('Cors Middleware', () => {
  test('should enable cors', async () => {
    app.get('/test_cors', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})

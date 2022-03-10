import { app } from '@/main/config'

import request from 'supertest'

describe('Body Parser Middleware', () => {
  test('should parse body as json', async () => {
    app.post('/test_bodyparser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_bodyparser')
      .send({ name: 'Rodrigo' })
      .expect({ name: 'Rodrigo' })
  })
})

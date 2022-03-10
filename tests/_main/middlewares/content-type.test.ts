import { app } from '@/main/config'

import request from 'supertest'

describe('Content Type Middleware', () => {
  test('should return default content-type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send(req.body)
    })

    await request(app).get('/test_content_type').expect('content-type', /json/)
  })
  test('should return given content-type', async () => {
    app.get('/test_content_type_forced', (req, res) => {
      res.type('xml')
      res.send(req.body)
    })

    await request(app)
      .get('/test_content_type_forced')
      .expect('content-type', /xml/)
  })
})

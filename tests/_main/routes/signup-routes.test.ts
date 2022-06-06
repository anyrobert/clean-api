import { app } from '@/main/config'

import request from 'supertest'

describe('SignUp Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'John Doe',
        email: 'asdas@asda.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})

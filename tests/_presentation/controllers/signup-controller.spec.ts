import { SignUpController } from '@/presentation/controllers/signup'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

const mockHttpPostRequest = (params: Record<string, string>): Record<string, any> => ({
  body: {
    ...params
  }
})

describe('SignUpController', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = makeSut()

    const httpRequest = mockHttpPostRequest({
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
  })
})

import { SignUpController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'

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
    expect(response.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut()

    const httpRequest = mockHttpPostRequest({
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', async () => {
    const sut = makeSut()

    const httpRequest = mockHttpPostRequest({
      email: 'any_email',
      name: 'any_name',
      passwordConfirmation: 'any_password'
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no password confirmation is provided', async () => {
    const sut = makeSut()

    const httpRequest = mockHttpPostRequest({
      email: 'any_email',
      password: 'any_password',
      name: 'any_name'
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})

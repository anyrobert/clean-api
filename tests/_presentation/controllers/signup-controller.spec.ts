import { SignUpController } from '@/presentation/controllers'
import {
  MissingParamError,
  InvalidParamError,
  ServerError
} from '@/presentation/errors'
import { EmailValidator } from '@/presentation/protocols'

type SutResponse = {
  sut: SignUpController
  emailValidator: EmailValidator
}

const makeSut = (): SutResponse => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email): boolean {
      return true
    }
  }

  const emailValidator = new EmailValidatorStub()
  const sut = new SignUpController(emailValidator)
  return {
    sut,
    emailValidator: emailValidator
  }
}

const mockHttpPostRequest = (
  params: Record<string, string>
): Record<string, any> => ({
  body: {
    ...params
  }
})

describe('SignUpController', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

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
    const { sut } = makeSut()

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
    const { sut } = makeSut()

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
    const { sut } = makeSut()

    const httpRequest = mockHttpPostRequest({
      email: 'any_email',
      password: 'any_password',
      name: 'any_name'
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 an invalid email is provided', async () => {
    const { sut, emailValidator } = makeSut()

    const httpRequest = mockHttpPostRequest({
      email: 'invalid_email',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      name: 'any_name'
    })

    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call email validator with correct email', async () => {
    const { sut, emailValidator } = makeSut()

    const email = 'any_email'

    const httpRequest = mockHttpPostRequest({
      email,
      password: 'any_password',
      passwordConfirmation: 'any_password',
      name: 'any_name'
    })

    const isValidSpy = jest.spyOn(emailValidator, 'isValid')

    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should return 500 if email validator throws', async () => {
    class EmailValidatorStub implements EmailValidator {
      isValid(email): boolean {
        throw new Error()
      }
    }

    const emailValidator = new EmailValidatorStub()
    const sut = new SignUpController(emailValidator)

    const httpRequest = mockHttpPostRequest({
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      name: 'any_name'
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })
})

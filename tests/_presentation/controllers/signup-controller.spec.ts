import {
  AddAccount,
  AddAccountModel,
  EmailValidator,
  AccountModel,
  SignUpController
} from '@/presentation/controllers/signup'

import {
  MissingParamError,
  InvalidParamError,
  ServerError
} from '@/presentation/errors'

const makeEmaiLValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountrStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
      }
      return Promise.resolve(fakeAccount)
    }
  }
  return new AddAccountrStub()
}

const mockHttpPostRequest = (
  params: Record<string, string>
): Record<string, any> => ({
  body: {
    ...params
  }
})

describe('SignUpController', () => {
  let sut: SignUpController
  let addAccountStub: AddAccount
  let emailValidatorStub: EmailValidator

  beforeEach(() => {
    emailValidatorStub = makeEmaiLValidator()
    addAccountStub = makeAddAccount()
    sut = new SignUpController(emailValidatorStub, addAccountStub)
  })
  test('Should return 400 if no name is provided', async () => {
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
    const httpRequest = mockHttpPostRequest({
      email: 'invalid_email',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      name: 'any_name'
    })

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('email'))
  })

  test('Should return 400 if password confirmation fails', async () => {
    const httpRequest = mockHttpPostRequest({
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'wrong_password',
      name: 'any_name'
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should call email validator with correct email', async () => {
    const email = 'any_email'

    const httpRequest = mockHttpPostRequest({
      email,
      password: 'any_password',
      passwordConfirmation: 'any_password',
      name: 'any_name'
    })

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should return 500 if email validator throws', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

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

  test('Should call AddAccount with correct values', async () => {
    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = mockHttpPostRequest({
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
      passwordConfirmation: 'any_password'
    })

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password',
      name: 'any_name'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

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
  test('Should return 200 if valid data is provided', async () => {
    const httpRequest = mockHttpPostRequest({
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
      passwordConfirmation: 'any_password'
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
  })
})

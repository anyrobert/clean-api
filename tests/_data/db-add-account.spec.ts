import {
  AddAccountModel,
  AccountModel,
  AddAccountRepository,
  DbAddAccount,
  Encrypter
} from '@/data/usecases/add-account'

const mockAccountModel = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }
      return Promise.resolve(fakeAccount)
    }
  }
  return new AddAccountRepositoryStub()
}

describe('DbAddAccount', () => {
  let sut: DbAddAccount
  let account: AddAccountModel
  let encrypter: Encrypter
  let addAccountRepository: AddAccountRepository

  beforeEach(() => {
    encrypter = makeEncrypterStub()
    addAccountRepository = makeAddAccountRepositoryStub()

    sut = new DbAddAccount(encrypter, addAccountRepository)
    account = mockAccountModel()
  })

  test('should call Encrypter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    await sut.add(account)
    expect(encryptSpy).toHaveBeenCalledWith(account.password)
  })

  test('should throw if encrypter throws', async () => {
    jest.spyOn(encrypter, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct values', async () => {
    const addSpy = jest.spyOn(addAccountRepository, 'add')
    await sut.add(account)
    expect(addSpy).toHaveBeenCalledWith({
      ...account,
      password: 'hashed_password'
    })
  })
})

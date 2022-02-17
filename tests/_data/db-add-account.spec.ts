import { AddAccountModel } from '@/domain/usecases'

import { DbAddAccount } from '@/data/usecases'
import { Encrypter } from '@/data/protocols'

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

describe('DbAddAccount', () => {
  let sut: DbAddAccount
  let account: AddAccountModel
  let encrypter: Encrypter

  beforeEach(() => {
    encrypter = makeEncrypterStub()
    sut = new DbAddAccount(encrypter)
    account = mockAccountModel()
  })

  test('should call Encrypter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    await sut.add(account)
    expect(encryptSpy).toHaveBeenCalledWith(account.password)
  })
})

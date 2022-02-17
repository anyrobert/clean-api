import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountModel } from '@/domain/usecases'

import { Encrypter } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}
  add = async (account: AddAccountModel): Promise<AccountModel> => {
    await this.encrypter.encrypt(account.password)
    return Promise.resolve(null)
  }
}

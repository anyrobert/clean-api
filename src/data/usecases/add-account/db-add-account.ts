import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter
} from '@/data/usecases/add-account'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}
  add = async (account: AddAccountModel): Promise<AccountModel> => {
    await this.encrypter.encrypt(account.password)
    return Promise.resolve(null)
  }
}

import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter
} from '@/data/usecases/add-account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  add = async (account: AddAccountModel): Promise<AccountModel> => {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add({
      ...account,
      password: hashedPassword
    })
    return Promise.resolve(null)
  }
}

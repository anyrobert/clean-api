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

  add = async (accountData: AddAccountModel): Promise<AccountModel> => {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    return await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })
  }
}

import { AddAccountModel } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}

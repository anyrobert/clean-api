import { AddAccountRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { AddAccountModel } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db/mongodb'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const insertedAccount = await accountCollection.findOne({
      _id: insertedId
    })
    return MongoHelper.map<AccountModel>(insertedAccount)
  }
}

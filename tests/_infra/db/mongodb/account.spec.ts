import { AccountMongoRepository, MongoHelper } from '@/infra/db/mongodb'

describe('Account Mongo Repository', () => {
  let sut: AccountMongoRepository

  beforeAll(async () => {
    await MongoHelper.connect()
  })
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    sut = new AccountMongoRepository()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })
})

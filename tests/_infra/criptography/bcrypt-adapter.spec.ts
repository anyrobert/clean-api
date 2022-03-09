import { BcryptAdapter } from '@/infra'

import bcrypt from 'bcrypt'

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter
  let salt: number
  beforeEach(() => {
    salt = 12
    sut = new BcryptAdapter(salt)
  })

  test('should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})

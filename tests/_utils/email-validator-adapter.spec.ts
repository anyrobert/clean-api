import { EmailValidatorAdapter } from '@/utils'

describe('EmailValidatorAdapter', () => {
  let sut: EmailValidatorAdapter

  beforeEach(() => {
    sut = new EmailValidatorAdapter()
  })
  test('Should return false if validator returns false', () => {
    expect(sut.isValid('invalid')).toBe(false)
  })
})

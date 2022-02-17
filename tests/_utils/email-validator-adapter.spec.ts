import { EmailValidatorAdapter } from '@/utils'

import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('EmailValidatorAdapter', () => {
  let sut: EmailValidatorAdapter

  beforeEach(() => {
    sut = new EmailValidatorAdapter()
  })
  test('Should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    expect(sut.isValid('invalid_email@email.com')).toBe(false)
  })
  test('Should return true if validator returns true', () => {
    expect(sut.isValid('valid_email@email.com')).toBe(true)
  })
})

import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}

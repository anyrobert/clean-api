import { HttpResponse, HttpRequest } from '@/presentation/protocols'

export interface Controller<T = HttpRequest> {
  handle: (request: T) => Promise<HttpResponse>
}

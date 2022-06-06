import { Collection, MongoClient, Document } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect(url?: string): Promise<void> {
    this.client = await MongoClient.connect(url ?? process.env.MONGO_URL)
  },
  async disconnect(): Promise<void> {
    await this.client.close()
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },
  map<T>(insertedDocument: Document): T {
    const { _id, ...documentWithoutId } = insertedDocument
    const document = {
      ...documentWithoutId,
      id: _id
    }
    return document as unknown as T
  }
}

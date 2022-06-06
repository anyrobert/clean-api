import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { app } = await import('./config/app')

    app.listen(env.port, () =>
      console.log(`Server running on port ${env.port}`)
    )
  })
  .catch(console.error)

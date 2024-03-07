import { fastify } from 'fastify'
import { routes } from './routes/routes'

const app = fastify()

app.register(routes)

app
  .listen({
    port: 3334,
  })
  .then(() => {
    console.log('Bod Server is running on port 3334')
  })

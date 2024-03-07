import { fastify } from 'fastify'
import { routes } from './routes/routes'

const app = fastify()

app.register(routes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Alice Server is running on port 3333')
  })

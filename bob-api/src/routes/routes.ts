import { FastifyInstance } from 'fastify'
import crypto from 'crypto'
import axios from 'axios'

export async function routes(app: FastifyInstance) {
  app.post('/message', async (request, reply) => {
    const message = 'Hello World!'

    const aliceKey = await axios
      .get('http://localhost:3333/alice-key')
      .then((response) => response.data.publicKey)

    const messageEncrypted = crypto.publicEncrypt(
      {
        key: aliceKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(message, 'utf-8'),
    )

    const messageToSend = messageEncrypted.toString('base64')

    console.log(messageToSend, 'messageToSend \n')

    const response = await axios
      .post('http://localhost:3333/alice-message', {
        message: messageToSend,
      })
      .then((response) => response.data)

    console.log(response)

    return reply.status(200).send(response)
  })
}

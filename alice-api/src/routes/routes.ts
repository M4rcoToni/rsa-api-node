import { FastifyInstance } from 'fastify'
import crypto from 'crypto'

export async function routes(app: FastifyInstance) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  })

  app.get('/alice-key', async () => {
    return { publicKey }
  })

  app.post('/alice-message', async (request, reply) => {
    try {
      const messageParams = request as {
        body: {
          message: string
        }
      }

      const { message } = messageParams.body

      const encryptedBuffer = Buffer.from(message, 'base64')

      const messageDecrypted = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        },
        encryptedBuffer,
      )

      return { messageDecrypted: messageDecrypted.toString() }
    } catch (error) {
      console.log(error)

      reply.code(500).send({ error: 'Erro ao descriptografar a mensagem' })
    }
  })
}

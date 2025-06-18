// import { InvalidaFileSize } from '@/app/usecases/errors/invalid-file-size'
// import { MissingFile } from '@/app/usecases/errors/missing-file'
// import { uploadImage } from '@/app/usecases/upload-image'
// import { isRight, unwrapEither } from '@/shared/either'
import { createShortLink } from '@/app/usecases/create-short-link'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		'/links',
		{
			schema: {
				summary: 'Create a short link',
				body: z.object({
					url: z.string().url().describe('The URL to shorten'),
					alias: z.string(),
				}),
				response: {
					201: z
						.object({ shortLink: z.string(), accessCount: z.number() })
						.describe('Short link created'),
					409: z.object({ message: z.string() }).describe('Short link already exists'),
				},
			},
		},
		async (request, reply) => {
			// Pegar os dados do corpo da requisição
			const { url, alias } = request.body

			// Criar o link curto
			const result = createShortLink({ url, alias })

			if (result)
				// Retornar o link curto criado
				return reply
					.status(201)
					.send({ shortLink: result.shortLink, accessCount: result.accessCount })
		}
	)
}

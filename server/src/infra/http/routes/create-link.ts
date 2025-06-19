import { createShortLink } from '@/app/usecases/create-short-link'
import { AlreadyExistsError } from '@/app/usecases/errors'
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
			const { url, alias } = request.body

			const result = await createShortLink({ url, alias })

			if (result instanceof AlreadyExistsError) {
				return reply.status(409).send({ message: result.message })
			}
			return reply
				.status(201)
				.send({ shortLink: result.shortLink, accessCount: result.accessCount })
		}
	)
}

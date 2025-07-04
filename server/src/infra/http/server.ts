import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link'
import { deleteLinkRoute } from './routes/delete-link'
import { getLinkRoute } from './routes/get-link'
import { getLinksRoute } from './routes/get-links'
import { updateAccessCountRoute } from './routes/update-access-count'
import { exportLinksRoute } from './routes/export-links'
import { healthRoute } from './routes/health'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		reply.status(400).send({
			message: error.validation.map((e) => e.message).join(', '),
		})
	}

	console.error(error)
	return reply.status(500).send({
		message: 'Internal server error',
	})
})

server.register(fastifyCors, { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] })
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Brevly API',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
})
server.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

//Routes
server.register(getLinksRoute)
server.register(getLinkRoute)
server.register(createLinkRoute)
server.register(deleteLinkRoute)
server.register(updateAccessCountRoute)
server.register(exportLinksRoute)
server.register(healthRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	console.info('Server is running')
})

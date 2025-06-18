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

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		reply.status(400).send({
			message: 'Validation error',
			errors: error.validation,
		})
	}

	console.error(error)
	return reply.status(500).send({
		message: 'Internal server error',
	})
})

server.register(fastifyCors, { origin: '*' })
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
server.register(createLinkRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	console.log('Server is running')
})

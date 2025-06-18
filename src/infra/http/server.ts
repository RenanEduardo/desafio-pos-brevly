import { env } from '@/env'
import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'

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

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	console.log('Server is running')
})

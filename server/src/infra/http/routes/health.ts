import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const healthRoute: FastifyPluginAsyncZod = async (server) => {
 server.get('/health', {
  schema: {
   summary: 'Health check endpoint',
   response: {
    200: z.object({
     status: z.string().describe('Health status of the service'),
    }).describe('Service is healthy'),
   },
  }
 }, async (_request, reply) => {
  return reply.status(200).send({ status: 'ok' });
 })
}
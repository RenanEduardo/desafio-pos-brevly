import { NotFoundError } from "@/app/usecases/errors";
import { getOriginalLink } from "@/app/usecases/get-original-link";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const getLinkRoute: FastifyPluginAsyncZod = async (server) => {
 server.get('/links/:alias',{
  schema: {
   summary: 'Get original URL for given alias',
   params: z.object({
    alias: z.string().describe('The alias of the short link to retrieve'),
   }),
   response: {
    200: z.object({
     originalUrl: z.string().url().describe('The original URL for the short link'),
     id: z.string().describe('The ID of the short link'),
    }).describe('Short link retrieved successfully'),
    404: z.object({ message: z.string() }).describe('Short link not found'),
    400: z.object({ message: z.string() }).describe('Short link alias is required'),
   },
  }
 }, async (request, reply) => {
  const { alias } = request.params;

  if (!alias) {
   return reply.status(400).send({ message: 'id is required' });
  } 

  const result = await getOriginalLink(alias);
  if(result instanceof NotFoundError) {
   return reply.status(404).send({ message: result.message });
  }
  return reply.status(200).send(result);
 })
}
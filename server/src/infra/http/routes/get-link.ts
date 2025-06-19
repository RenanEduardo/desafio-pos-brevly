import { NotFoundError } from "@/app/usecases/errors";
import { getOriginalLink } from "@/app/usecases/get-original-link";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const getLinkRoute: FastifyPluginAsyncZod = async (server) => {
 server.get('/links/:shortlink',{
  schema: {
   summary: 'Get original URL for given alias',
   params: z.object({
    shortlink: z.string().describe('The alias of the short link to retrieve'),
   }),
   response: {
    200: z.object({
     originalUrl: z.string().url().describe('The original URL for the short link'),
    }).describe('Short link retrieved successfully'),
    404: z.object({ message: z.string() }).describe('Short link not found'),
    400: z.object({ message: z.string() }).describe('Short link alias is required'),
   },
  }
 }, async (request, reply) => {
  const { params } = request;
  const { shortlink } = params;

  if (!shortlink) {
   return reply.status(400).send({ message: 'Short link alias is required' });
  } 



  const result = await getOriginalLink(shortlink);
  if(result instanceof NotFoundError) {
   return reply.status(404).send({ message: result.message });
  }
  return reply.status(200).send({originalUrl: result});
 })
}
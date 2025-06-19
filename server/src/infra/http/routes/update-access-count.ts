import { NotFoundError } from "@/app/usecases/errors";
import { updateAccessCount } from "@/app/usecases/update-access-count";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";




export const updateAccessCountRoute: FastifyPluginAsyncZod = async (server) => {
 server.patch('/links/:shortlink/access-count', {
  schema: {
   summary: 'Update access count for a short link',
   params: z.object({
    shortlink: z.string().describe('The alias of the short link to update'),
   }),
   response: {
    200: z.object({
     accessCount: z.number(),
    }).describe('Access count updated successfully'),
    404: z.object({ message: z.string() }).describe('Short link not found'),
    400: z.object({ message: z.string() }).describe('Short link alias is required'),
   },
  }
 }, async (request, reply) => {
  const { shortlink } = request.params;

  if (!shortlink) {
   return reply.status(400).send({ message: 'Short link alias is required' });
  }

  const result = await updateAccessCount(shortlink);
  if (result instanceof NotFoundError) {
   return reply.status(404).send({ message: result.message });

  }

  return reply.status(200).send({ accessCount: result.accessCount }); 
 })
}
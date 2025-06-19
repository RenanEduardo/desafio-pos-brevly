import { getAllLinks } from "@/app/usecases/get-all-links";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
 server.get('/links',{
  schema: {
   summary: 'Get all links',
   response: {
    200: z.object({
     links: z.array(
      z.object({
       shortlink: z.string().describe('The alias of the short link'),
       originalUrl: z.string().url().describe('The original URL for the short link'),
       accessCount: z.number().describe('The number of times the short link has been accessed'),
      }).optional()
     ).describe('List of all short links'),
    }),
   },
  }
 }, async (_request, reply) => {
 
  const result = await getAllLinks()
  return reply.status(200).send({links: result});
 })
}
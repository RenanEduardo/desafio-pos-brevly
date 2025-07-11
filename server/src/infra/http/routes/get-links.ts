import { getAllLinks } from "@/app/usecases/get-all-links";
import { count } from "console";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
 server.get('/links',{
  schema: {
   summary: 'Get all links',
   querystring: z.object({
    page: z.number().optional().default(1).describe('Page number for pagination'),
    pageSize: z.number().optional().default(20).describe('Number of links per page'),
   }),
   response: {
    200: z.object({
     links: z.array(
      z.object({
       id: z.string().describe('The unique identifier of the short link'),
       shortLink: z.string().describe('The alias of the short link'),
       originalUrl: z.string().url().describe('The original URL for the short link'),
       accessCount: z.number().describe('The number of times the short link has been accessed'),
      }).optional()
     ).describe('List of all short links'),
     count: z.string(),
    }),
   },
  }
 }, async (request, reply) => {
  const { page, pageSize } = request.query;
 
  const result = await getAllLinks({page, pageSize})
  return reply.status(200).send(result);
 })
}
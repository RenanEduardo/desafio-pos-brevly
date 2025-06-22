import { exportLinks } from "@/app/usecases/export-links";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
 server.post(
  '/links/export',
  {
   schema: {
    summary: 'Export all links',
    response: { 
     200: z.object({
      exportUrl: z.string().url()
     })
    }
   }

  },
  async (_request, reply) => {

   const result = await exportLinks()

   reply.status(200).send({
    exportUrl: result
   })   
  }
 )



}
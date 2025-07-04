import { deleteShortLink } from "@/app/usecases/delete-short-link";
import { NotFoundError } from "@/app/usecases/errors";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";



export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
 server.delete(
  '/links/:id',
  {
   schema: {
    summary: 'Delete a short link',
    params: z.object({
     id: z.string().describe('The id of the short link to delete'),
   }),
    response: {
     204: z.void().describe('Short link deleted successfully'),
     404: z.object({ message: z.string() }).describe('Short link not found')
    }
   }
  },
  async (request, reply) => {
   const { params } = request
   const { id } = params;
   
   if(!id) {
    return reply.status(400).send({ message: 'id is required' });
   }
   try {
    await deleteShortLink(id);
   } catch (error) {
     if(error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
     }
     return reply.status(500).send({ message: 'Internal server error' });
   }
   return reply.status(204).send();
  }
 )
}
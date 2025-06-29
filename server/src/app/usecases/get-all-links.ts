import { z } from "zod";
import { db } from "@/infra/db";


const getAllLinksOutput = z.object({
 id: z.string(),
 shortLink: z.string(),
 originalUrl: z.string().url(),
 accessCount: z.number()
})

type GetAllLinksOutput = z.input<typeof getAllLinksOutput>; 

export async function getAllLinks(): Promise<Array<GetAllLinksOutput>> {
 
 const result = await db.query.shortlinks.findMany()

 return result.map(link => ({
  id: link.id,
  shortLink: link.shortenedUrl,
  originalUrl: link.originalUrl,
  accessCount: link.accessCount
 }))
}

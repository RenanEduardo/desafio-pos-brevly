import { z } from "zod";
import { db } from "@/infra/db";


const getAllLinksOutput = z.object({
 shortlink: z.string(),
 originalUrl: z.string().url(),
 accessCount: z.number()
})

type GetAllLinksOutput = z.input<typeof getAllLinksOutput>; 

export async function getAllLinks(): Promise<Array<GetAllLinksOutput>> {
 
 const result = await db.query.shortlinks.findMany()

 return result.map(link => ({
  shortlink: link.shortenedUrl,
  originalUrl: link.originalUrl,
  accessCount: link.accessCount
 }))
}

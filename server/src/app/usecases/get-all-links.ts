import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schema";
import { count } from "console";
import { sql } from "drizzle-orm";


const getAllLinksInput = z.object({
 page: z.number().optional().default(1),
 pageSize: z.number().optional().default(20)
});

const getAllLinksOutput = z.object({
 links: z.array(z.object({
  id: z.string(),
  shortLink: z.string(),
  originalUrl: z.string().url(),
  accessCount: z.number(),
 })),
 count: z.string()
})

type GetAllLinksOutput = z.infer<typeof getAllLinksOutput>;
type GetAllLinksInput = z.input<typeof getAllLinksInput>;
export async function getAllLinks(input: GetAllLinksInput): Promise<GetAllLinksOutput> {

 const { page, pageSize } = getAllLinksInput.parse(input)

 const [links, [{ count }]] = await Promise.all([
  db.select().from(schema.shortlinks).offset((page - 1) * pageSize).limit(pageSize),
  db.select({ count: sql<string>`count(*)` }).from(schema.shortlinks)
 ])
 return {
  links: links.map(link => ({
   id: link.id,
   shortLink: link.shortenedUrl,
   originalUrl: link.originalUrl,
   accessCount: link.accessCount
  })),
  count
 }
}

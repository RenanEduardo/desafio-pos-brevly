import { z } from "zod";
import { NotFoundError } from "./errors";
import { db } from "@/infra/db";
import { eq } from "drizzle-orm";
import { schema } from "@/infra/db/schema";
import { BREVLY_LINK } from "@/constants";


const getOriginalLinkInput = z.string()
type GetOriginalLinkInput = z.input<typeof getOriginalLinkInput>

export async function getOriginalLink(alias: GetOriginalLinkInput): Promise<string | NotFoundError> {
 const shortLink = `${BREVLY_LINK}${alias}`
 
 const result = await db.query.shortlinks.findFirst({
  where: eq(schema.shortlinks.shortenedUrl, shortLink)
 })

 console.log('getOriginalLink result:', result)
 if (!result) {
  return new NotFoundError(`Short link ${shortLink} not found`)
 }

 return result.originalUrl
}

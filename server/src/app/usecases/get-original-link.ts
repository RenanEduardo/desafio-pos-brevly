import { z } from "zod";
import { NotFoundError } from "./errors";
import { db } from "@/infra/db";


const getOriginalLinkInput = z.string()

const getOriginalLinkOutput = z.object({
  originalUrl: z.string().url().describe('The original URL for the short link'),
  id: z.string().describe('The ID of the short link'),
}).describe('Short link retrieved successfully')


type GetOriginalLinkInput = z.input<typeof getOriginalLinkInput>
type GetOriginalLinkOutput = z.output<typeof getOriginalLinkOutput>

export async function getOriginalLink(alias: GetOriginalLinkInput): Promise<GetOriginalLinkOutput | NotFoundError> {
 
 const result = await db.query.shortlinks.findFirst({
  where: (shortlinks, {like}) => like(shortlinks.shortenedUrl, `%/${alias}`),
 })

 if (!result) {
  return new NotFoundError(`Short link ${alias} not found`)
 }

 return {originalUrl: result.originalUrl, id: result.id}
}

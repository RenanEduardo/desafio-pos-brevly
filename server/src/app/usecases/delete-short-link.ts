import { db } from "@/infra/db";
import { schema } from "@/infra/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { NotFoundError } from "./errors";


const deleteShortLinkInput = z.string()
type DeleteShortLinkInput = z.input<typeof deleteShortLinkInput>

export async function deleteShortLink(alias: DeleteShortLinkInput): Promise<void> {
  const shortLink = `https://brev.ly/${alias}`

  const result = await db.query.shortlinks.findFirst({
    where: eq(schema.shortlinks.shortenedUrl, shortLink),
  })

  if (!result) {
    throw new NotFoundError(`Short link ${shortLink} not found`)
  }

  await db.delete(schema.shortlinks).where(eq(schema.shortlinks.shortenedUrl, shortLink))
}
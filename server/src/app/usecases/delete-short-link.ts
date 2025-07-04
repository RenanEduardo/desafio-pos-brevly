import { db } from "@/infra/db";
import { schema } from "@/infra/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { NotFoundError } from "./errors";


const deleteShortLinkInput = z.string()
type DeleteShortLinkInput = z.input<typeof deleteShortLinkInput>

export async function deleteShortLink(id: DeleteShortLinkInput): Promise<void> {

  const result = await db.query.shortlinks.findFirst({
    where: eq(schema.shortlinks.id, id),
  })

  if (!result) {
    throw new NotFoundError(`Short link ${id} not found`)
  }

  await db.delete(schema.shortlinks).where(eq(schema.shortlinks.id, id))
}
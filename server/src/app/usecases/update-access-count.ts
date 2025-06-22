import { z } from "zod";
import { NotFoundError } from "./errors";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schema";
import { eq, sql } from "drizzle-orm";
import { BREVLY_LINK } from "@/constants";

const updateAccessCountInput = z.string()

type UpdateAccessCountInput = z.infer<typeof updateAccessCountInput>;

export const updateAccessCount = async (alias: UpdateAccessCountInput): Promise<{accessCount: number} | NotFoundError> => {

 const shortLink = `${BREVLY_LINK}${alias}`

 const result = await 
  db.update(schema.shortlinks)
  .set({accessCount: sql`shortlinks.access_count + 1`})
  .where(eq(schema.shortlinks.shortenedUrl, shortLink))
  .returning({ accessCount: schema.shortlinks.accessCount });

 if(!result.length) {
  return new NotFoundError(`Short link ${shortLink} not found`);
 }
 
 return result[0]
}
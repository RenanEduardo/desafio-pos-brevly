import { z } from "zod";
import { NotFoundError } from "./errors";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schema";
import { eq, sql } from "drizzle-orm";

const updateAccessCountInput = z.string()

type UpdateAccessCountInput = z.infer<typeof updateAccessCountInput>;

export const updateAccessCount = async (id: UpdateAccessCountInput): Promise<{accessCount: number} | NotFoundError> => {

 const result = await 
  db.update(schema.shortlinks)
  .set({accessCount: sql`shortlinks.access_count + 1`})
  .where(eq(schema.shortlinks.id, id))
  .returning({ accessCount: schema.shortlinks.accessCount });

 if(!result.length) {
  return new NotFoundError(`Short link ${id} not found`);
 }
 
 return result[0]
}
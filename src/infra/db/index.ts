import { env } from '@/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { schema } from './schemas'

export const pg = postgres(env.DATABASE_URL)
await pg`DROP TABLE IF EXISTS shortlinks`

export const db = drizzle(pg, { schema })

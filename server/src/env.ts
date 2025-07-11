import { z } from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
	DATABASE_URL: z.string().url().startsWith('postgresql://'),
	CLOUDFARE_ACCOUNT_ID: z.string(),
	CLOUDFARE_ACCESS_KEY_ID: z.string(),
	CLOUDFARE_SECREY_ACCESS_KEY: z.string(),
	CLOUDFARE_BUCKET: z.string(),
	CLOUDFARE_PUBLIC_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)

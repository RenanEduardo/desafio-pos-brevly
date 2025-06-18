import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schema'
import { z } from 'zod'

const createLinkInput = z.object({
	url: z.string().url(),
	alias: z.string(),
})

const BREVLY_URL = 'https://brev.ly'

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createShortLink(
	input: CreateLinkInput
): Promise<{ shortLink: string; accessCount: number }> {
	const { url, alias } = createLinkInput.parse(input)
	const shortLink = `${BREVLY_URL}/${alias}`

	await db.insert(schema.shortlinks).values({
		originalUrl: url,
		shortenedUrl: shortLink,
		accessCount: 0,
		createdAt: new Date(),
	})

	return { shortLink, accessCount: 0 }
}

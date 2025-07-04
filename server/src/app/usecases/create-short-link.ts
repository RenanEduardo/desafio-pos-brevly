import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { AlreadyExistsError } from './errors'

const createLinkInput = z.object({
	url: z.string().url(),
	alias: z.string(),
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createShortLink(
	input: CreateLinkInput
): Promise<{ id: string, shortLink: string; accessCount: number } | AlreadyExistsError> {
	const { url, alias } = createLinkInput.parse(input)
	const shortLink = `${alias}`

	const result = await db.query.shortlinks.findFirst({
		where: eq(schema.shortlinks.shortenedUrl, shortLink),
	})

	if (!result) {
		const inserted = await db.insert(schema.shortlinks).values({
			originalUrl: url,
			shortenedUrl: shortLink,
			accessCount: 0,
			createdAt: new Date(),
		}).returning({ id: schema.shortlinks.id })

		const id = inserted[0]?.id

		if (!id) {
			throw new Error('Failed to create short link')
		}

		return { id, shortLink, accessCount: 0 }
	}

	return new AlreadyExistsError(`Short link ${shortLink} already exists`)
}

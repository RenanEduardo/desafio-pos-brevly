import { db } from '@/infra/db'
import { schema } from '@/infra/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { AlreadyExistsError } from './errors'
import { BREVLY_LINK } from '@/constants'

const createLinkInput = z.object({
	url: z.string().url(),
	alias: z.string(),
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createShortLink(
	input: CreateLinkInput
): Promise<{ shortLink: string; accessCount: number } | AlreadyExistsError> {
	const { url, alias } = createLinkInput.parse(input)
	const shortLink = `${BREVLY_LINK}${alias}`

	const result = await db.query.shortlinks.findFirst({
		where: eq(schema.shortlinks.shortenedUrl, shortLink),
	})

	if (!result) {
		await db.insert(schema.shortlinks).values({
			originalUrl: url,
			shortenedUrl: shortLink,
			accessCount: 0,
			createdAt: new Date(),
		})
		return { shortLink, accessCount: 0 }
	}

	return new AlreadyExistsError(`Short link ${shortLink} already exists`)
}

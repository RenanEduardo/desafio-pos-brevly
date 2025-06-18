import { z } from 'zod'

const createLinkInput = z.object({
	url: z.string().url(),
	alias: z.string(),
})

type CreateLinkInput = z.input<typeof createLinkInput>

export function createShortLink(input: CreateLinkInput): {
	shortLink: string
	accessCount: number
} {
	const { alias } = createLinkInput.parse(input)
	const shortLink = `https://brev.ly/${alias}`

	return { shortLink, accessCount: 0 }
}

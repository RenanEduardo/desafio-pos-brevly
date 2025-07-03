import type { AddLinkRepository } from '../../infra/add-link-repository-http'
import type { Link, ShortLink } from '../interfaces'

export class AddLinkUseCase {
	private readonly addLinkRepository: AddLinkRepository

	constructor(addLinkRepository: AddLinkRepository) {
		this.addLinkRepository = addLinkRepository
	}

	async execute(link: Link): Promise<ShortLink> {
		const response = await this.addLinkRepository.add(link)

		return {
			id: response.id,
			originalUrl: link.url,
			shortLink: response.shortLink,
			accessCount: response.accessCount,
		}
	}
}

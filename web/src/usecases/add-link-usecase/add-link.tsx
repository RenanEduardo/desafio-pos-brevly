import type { AddLinkRepository } from '../../infra/add-link-repository-http'
import { LinkError } from '../error'
import type { Link, ShortLink } from '../interfaces'

export class AddLinkUseCase {
	private readonly addLinkRepository: AddLinkRepository

	constructor(addLinkRepository: AddLinkRepository) {
		this.addLinkRepository = addLinkRepository
	}

	async execute(link: Link): Promise<ShortLink | LinkError> {
		const response = await this.addLinkRepository.add(link)
		if (response instanceof LinkError) {
			return response
		}
		return {
			id: response.id,
			originalUrl: link.url,
			shortLink: response.shortLink,
			accessCount: response.accessCount,
		}
	}
}

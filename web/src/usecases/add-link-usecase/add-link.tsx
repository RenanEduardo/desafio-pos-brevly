import type { AddLinkRepository } from "../../infra/add-link-repository-http";
import { type Link, LinkSchema } from "../interfaces";

export class AddLinkUseCase {
	private readonly addLinkRepository: AddLinkRepository;

	constructor(addLinkRepository: AddLinkRepository) {
		this.addLinkRepository = addLinkRepository;
	}

	async execute(link: Link): Promise<void> {
		try {
			LinkSchema.parse(link);
			await this.addLinkRepository.add(link);
		} catch (_error) {
			throw new Error("Failed to add link");
		}
	}
}

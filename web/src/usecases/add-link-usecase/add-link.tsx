import type { AddLinkRepository } from "../../infra/add-link-repository";
import { LinkSchema, type Link } from "../interfaces";

export class AddLinkUseCase {
	private readonly addLinkRepository: AddLinkRepository;

	constructor(addLinkRepository: AddLinkRepository) {
		this.addLinkRepository = addLinkRepository;
	}

	async execute(link: Link): Promise<void> {
		try {
			LinkSchema.parse(link);
			await this.addLinkRepository.add(link);
		} catch (error) {
			throw new Error("Failed to add link");
		}
	}
}

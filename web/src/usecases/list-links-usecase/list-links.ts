import type { ListLinksRepository } from "../../infra/list-links-repository-http";
import type { ShortLink } from "../interfaces";



export class ListLinksUseCase {
	private readonly listLinkRepository: ListLinksRepository;

	constructor(listLinkRepository: ListLinksRepository) {
		this.listLinkRepository = listLinkRepository;
	}

	async execute(): Promise<ShortLink[]> {
   const response = await this.listLinkRepository.list();
   return response.links;
	}
}

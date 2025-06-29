import axios from "axios";
import {
	type ListLinksResponse,
	ListLinksResponseSchema,
} from "../usecases/interfaces";

export interface ListLinksRepository {
	list(): Promise<ListLinksResponse>;
}

export class ListLinksRepositoryHttp implements ListLinksRepository {
	private readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
	async list(): Promise<ListLinksResponse> {
		const response = await axios.get(this.baseUrl);
		if (response.status !== 200)
			throw new Error(`Failed to fetch links:  ${response.data.message}`);

		const links = ListLinksResponseSchema.parse(response.data);
		return {
			links: links.links,
		};
	}
}

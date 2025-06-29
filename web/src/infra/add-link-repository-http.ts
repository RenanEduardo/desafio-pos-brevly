import axios from "axios";
import {
	type AddLinkResponse,
	AddLinkResponseSchema,
	type Link,
} from "../usecases/interfaces";

export interface AddLinkRepository {
	add(link: Link): Promise<AddLinkResponse>;
}

export class AddLinkRepositoryHttp implements AddLinkRepository {
  private readonly baseUrl:string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

	async add(link: Link): Promise<AddLinkResponse> {
		const response = await axios.post(this.baseUrl, link);

		if (response.status !== 201)
			throw new Error(`Failed to add link:  ${response.data.message}`);

		const { accessCount, shortLink } = AddLinkResponseSchema.parse(
			response.data,
		);
		return {
			shortLink,
			accessCount,
		};
	}
}

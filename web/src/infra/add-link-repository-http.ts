import axios from 'axios'
import { LinkError } from '../usecases/error'
import { type AddLinkResponse, AddLinkResponseSchema, type Link } from '../usecases/interfaces'

export interface AddLinkRepository {
	add(link: Link): Promise<AddLinkResponse |	LinkError>
}

export class AddLinkRepositoryHttp implements AddLinkRepository {
	private readonly baseUrl: string

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	async add(link: Link): Promise<AddLinkResponse | LinkError> {

		try {
			const response = await axios.post(this.baseUrl, link)
			const { id, accessCount, shortLink } = AddLinkResponseSchema.parse(response.data)
			return {
				id,
				shortLink,
				accessCount,
			}
			
		} catch (error) {
			if (axios.isAxiosError<LinkError>(error)) {
				return new LinkError(error.response?.data.message || error.message)
			}
			return new LinkError('Error parsing data')
		}



	}
}

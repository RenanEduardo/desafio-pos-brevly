import axios from 'axios'
import { LinkError,  NotFoundError } from '../usecases/error'
import { type GetLinkResponse, GetLinkResponseSchema } from '../usecases/interfaces'

export interface GetLinkRepository {
	get(alias: string): Promise<GetLinkResponse>
}

export class GetLinkRepositoryHttp implements GetLinkRepository {
	private readonly baseUrl: string
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	async get(alias: string): Promise<GetLinkResponse> {
		try {
			const response = await axios.get(`${this.baseUrl}/${alias}`)
			const link = GetLinkResponseSchema.parse(response.data)
			return link
		} catch (error) {
			if(	axios.isAxiosError(error)) {
				if (error.response?.status === 404) {
					throw new NotFoundError('Link not found')
				}
				throw new LinkError(error.response?.data.message || error.message)
			}
			throw new LinkError('Error parsing data')
		}
	}
}

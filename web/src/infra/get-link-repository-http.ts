import axios from 'axios'
import { LinkError,  NotFoundError } from '../usecases/error'
import { type GetLinkResponse, GetLinkResponseSchema } from '../usecases/interfaces'

export interface GetLinkRepository {
	get(alias: string): Promise<GetLinkResponse | LinkError | NotFoundError>
}

export class GetLinkRepositoryHttp implements GetLinkRepository {
	private readonly baseUrl: string
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	async get(alias: string): Promise<GetLinkResponse | LinkError | NotFoundError> {
		try {
			const response = await axios.get(`${this.baseUrl}/${alias}`)
			const originalUrl = GetLinkResponseSchema.parse(response.data?.originalUrl)
			return originalUrl
		} catch (error) {
			if(	axios.isAxiosError(error)) {
				if (error.response?.status === 404) {
					return new NotFoundError('Link not found')
				}
				return new LinkError(error.response?.data.message || error.message)
			}

			return new LinkError('Error parsing data')
		}
	}
}

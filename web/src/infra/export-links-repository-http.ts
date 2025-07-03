import axios from 'axios'
import { LinkError } from '../usecases/error'
import { type ExportLinksResponse, ExportLinksResponseSchema } from '../usecases/interfaces'

export interface ExportLinksRepository {
	export(): Promise<ExportLinksResponse>
}

export class ExportLinksRepositoryHttp implements ExportLinksRepository {
	private readonly baseUrl: string
 private readonly path: string = '/export'
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl + this.path
	}

	async export(): Promise<ExportLinksResponse> {
		try {
			const response = await axios.post(this.baseUrl)
			const exportUrl  = ExportLinksResponseSchema.parse(response.data?.exportUrl)
			return exportUrl
		} catch (error) {
			if (axios.isAxiosError<LinkError>(error)) {
				throw new LinkError(error.response?.data.message || error.message)
			}
			throw new LinkError('Error parsing data')
		}
	}
}

/** biome-ignore-all lint/suspicious/noConfusingVoidType: <explicitly setting void> */
import axios from 'axios'
import { LinkError } from '../usecases/error'

export interface DeleteLinkRepository {
	delete(id: string): Promise<void>
}

export class DeleteLinkRepositoryHttp implements DeleteLinkRepository {
	private readonly baseUrl: string
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	async delete(id:string): Promise<void> {
		try {
			await axios.delete(`${this.baseUrl}/${id}`)
		} catch (error) {
			if (axios.isAxiosError<LinkError>(error)) {
				throw new LinkError(error.response?.data.message || error.message)
			}
		}
	}
}

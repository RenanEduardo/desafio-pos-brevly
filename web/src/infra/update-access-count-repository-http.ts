/** biome-ignore-all lint/suspicious/noConfusingVoidType: <explicity returning void intentional> */
import axios from 'axios'
import { LinkError } from '../usecases/error'

export interface UpdateAccessCountRepository {
 update(alias: string): Promise<void>
}

export class UpdateAccessCountRepositoryHttp implements UpdateAccessCountRepository {
	private readonly baseUrl: string

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	async update(alias: string): Promise<void> {
		try {
			await axios.patch(`${this.baseUrl}/${alias}/access-count`)
		} catch (error) {
			if (axios.isAxiosError<LinkError>(error)) {
				throw new LinkError(error.response?.data.message || error.message)
			}
			throw new LinkError('Error parsing data')
		}
	}
}

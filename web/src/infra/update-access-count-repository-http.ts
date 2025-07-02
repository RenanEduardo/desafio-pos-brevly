/** biome-ignore-all lint/suspicious/noConfusingVoidType: <explicity returning void intentional> */
import axios from 'axios'
import { LinkError } from '../usecases/error'

export interface UpdateAccessCountRepository {
 update(alias: string): Promise<void | LinkError>
}

export class UpdateAccessCountRepositoryHttp implements UpdateAccessCountRepository {
	private readonly baseUrl: string

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	async update(alias: string): Promise<void | LinkError> {
		try {
			await axios.patch(`${this.baseUrl}/${alias}/access-count`)
		} catch (error) {
			if (axios.isAxiosError<LinkError>(error)) {
				return new LinkError(error.response?.data.message || error.message)
			}
			return new LinkError('Error parsing data')
		}
	}
}

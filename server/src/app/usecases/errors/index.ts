export class AlreadyExistsError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'AlreadyExistsError'
	}
}

export class	NotFoundError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'NotFoundError'
	}
}
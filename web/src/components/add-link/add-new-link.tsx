import { useState } from 'react'
import { AddLinkRepositoryHttp } from '../../infra/add-link-repository-http'
import { useLinksStore } from '../../store/links'
import { AddLinkUseCase } from '../../usecases/add-link-usecase/add-link'
import { LinkError } from '../../usecases/error'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function AddNewLink() {
	const [originalLinkInput, setOriginalLinkInput] = useState('')
	const [originalLinkError, setOriginalLinkError] = useState({
		error: false,
		message: '',
	})
	const [aliasInput, setAliasInput] = useState('')
	const [aliasError, setAliasError] = useState({ error: false, message: '' })
	const [inProgress, setInProgress] = useState(false)

	const { baseUrl, addLink, updateLink, removeLink, setToast, setToastOpen } = useLinksStore(
		(state) => state
	)

	function isValidInput(input: string): boolean {
		if (input.trim() === '') return false
		if (input === '404') return false
		return true
	}

	async function handleAddLink() {
		if (!isValidInput(originalLinkInput)) {
			setOriginalLinkError({
				error: true,
				message: 'O link encurtado não pode ser um valor inválido.',
			})
			return
		}
		if (!isValidInput(aliasInput)) {
			setAliasError({
				error: true,
				message: 'O link encurtado não pode ser um valor inválido.',
			})
			return
		}
		setInProgress(true)
		const url =
			originalLinkInput.startsWith('http') || originalLinkInput.startsWith('https')
				? originalLinkInput
				: `https://${originalLinkInput}`

		const optimisticResponse = {
			id: 'temp-id', // This will be replaced by the server
			originalUrl: url,
			shortLink: `https://brev.ly/${aliasInput}`,
			accessCount: 0,
		}

		addLink(optimisticResponse)

		const response = await new AddLinkUseCase(new AddLinkRepositoryHttp(baseUrl)).execute({
			url,
			alias: aliasInput,
		})

		if (response instanceof LinkError) {
			setToast({
				title: 'Error',
				message: response.message,
				type: 'error',
				isOpen: false,
			})
			setToastOpen(true)

			removeLink(optimisticResponse.shortLink)
		} else {
			updateLink(response.shortLink, response)
		}
		setInProgress(false)
	}

	return (
		<div className="md:w-[23.75rem] w-full bg-gray-100 rounded-lg flex flex-col gap-6 p-8">
			<span className="text-lg font-bold text-gray-600">Novo Link</span>
			<div>
				<Input
					type="text"
					label="Link Original"
					placeholder="www.exemplo.com"
					value={originalLinkInput}
					onChange={(e) => {
						setOriginalLinkInput(e.target.value)
						if (originalLinkError.error)
							setOriginalLinkError({ error: false, message: '' })
					}}
					error={originalLinkError.error}
					errorMsg={originalLinkError.message}
				/>
			</div>
			<div>
				<Input
					type="text"
					label="Link Encurtado"
					placeholder="brev.ly/"
					value={aliasInput}
					onChange={(e) => {
						setAliasInput(e.target.value)
						if (aliasError.error) setAliasError({ error: false, message: '' })
					}}
					error={aliasError.error}
					errorMsg={aliasError.message}
				/>
			</div>
			<Button onClick={handleAddLink} disabled={inProgress}>
				Salvar link
			</Button>
		</div>
	)
}

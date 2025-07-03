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

	const {
		brevlyUrl,
		baseUrl,
		addLink,
		updateLink,
		removeLink,
		setToast,
		setToastOpen,
		setIsLoading,
	} = useLinksStore((state) => state)

	function isValidInput(input: string): boolean {
		if (input.trim() === '') return false
		if (input === '404') return false
		return true
	}

	function resetInputs() {
		setOriginalLinkInput('')
		setAliasInput('')
		setOriginalLinkError({ error: false, message: '' })
		setAliasError({ error: false, message: '' })
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
			id: 'temp-id',
			originalUrl: url,
			shortLink: `${brevlyUrl}${aliasInput}`,
			accessCount: 0,
		}

		setIsLoading(true)
		addLink(optimisticResponse)

		resetInputs()

		try {
			const response = await new AddLinkUseCase(new AddLinkRepositoryHttp(baseUrl)).execute({
				url,
				alias: aliasInput,
			})
			updateLink(response.shortLink, response)
		} catch (error) {
			if (error instanceof LinkError) {
				setToast({
					title: 'Error',
					message: error.message,
					type: 'error',
					isOpen: false,
				})
				setToastOpen(true)
				removeLink(optimisticResponse.id)
			}
		}
		setIsLoading(false)
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

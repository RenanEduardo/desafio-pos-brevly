import { DownloadIcon } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { ExportLinksRepositoryHttp } from '../../infra/export-links-repository-http'
import { ListLinksRepositoryHttp } from '../../infra/list-links-repository-http'
import { useLinksStore } from '../../store/links'
import { ExportLinksUseCase } from '../../usecases/export-links/export-links'
import { ListLinksUseCase } from '../../usecases/list-links-usecase/list-links'
import { downloadUrl } from '../../util'
import { Button } from '../ui/button'
import { ListItem } from './components/list-item'

export function LinksList() {
	const { baseUrl, setLinks, links, setToast, setToastOpen } = useLinksStore((state) => state)

	useEffect(() => {
		async function fetchLinks() {
			try {
				const links = await new ListLinksUseCase(
					new ListLinksRepositoryHttp(baseUrl)
				).execute()
				setLinks(links)
			} catch (error) {
				console.error('Error fetching links:', error)
			}
		}

		fetchLinks()
	}, [baseUrl, setLinks])

	async function handleDownloadCSV() {
		const response = await new ExportLinksUseCase(
			new ExportLinksRepositoryHttp(baseUrl)
		).execute()
		if (response instanceof Error) {
			setToast({
				title: 'Error',
				message: response.message,
				type: 'error',
				isOpen: false,
			})
			setToastOpen(true)
		} else {
			await downloadUrl(response)
		}
	}

	return (
		<div className="w-[36.25rem] bg-gray-100 rounded-lg p-8">
			<div className="w-full inline-flex items-center justify-between mb-6">
				<span className="text-lg text-gray-600 font-bold">Meus Links</span>
				<Button size="secondary" onClick={handleDownloadCSV}>
					<DownloadIcon size={16} />
					Baixar CSV
				</Button>
			</div>
			<div>
				{links.map((link) => (
					<ListItem key={link.id} link={link} />
				))}
			</div>
		</div>
	)
}

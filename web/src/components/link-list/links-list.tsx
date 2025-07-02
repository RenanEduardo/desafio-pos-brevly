import { DownloadIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { ExportLinksRepositoryHttp } from '../../infra/export-links-repository-http'
import { ListLinksRepositoryHttp } from '../../infra/list-links-repository-http'
import { useLinksStore } from '../../store/links'
import { ExportLinksUseCase } from '../../usecases/export-links/export-links'
import { ListLinksUseCase } from '../../usecases/list-links-usecase/list-links'
import { downloadUrl } from '../../util'
import { Button } from '../ui/button'
import { EmptyList } from './components/empty-list'
import { ListItem } from './components/list-item'

export function LinksList() {
	const { baseUrl, setLinks, links, setToast, setToastOpen } = useLinksStore((state) => state)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		async function fetchLinks() {
			try {
				setIsLoading(true)
				const links = await new ListLinksUseCase(
					new ListLinksRepositoryHttp(baseUrl)
				).execute()
				setLinks(links)
				setIsLoading(false)
			} catch (error) {
				setLinks([])
				setIsLoading(false)

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
		<div className="sm:w-[36.25rem] w-full bg-gray-100 rounded-lg p-8 h-fit">
			<div className="w-full inline-flex items-center justify-between mb-6">
				<span className="text-lg text-gray-600 font-bold">Meus Links</span>
				<Button size="secondary" onClick={handleDownloadCSV} disabled={!links.length}>
					<DownloadIcon size={16} />
					Baixar CSV
				</Button>
			</div>
			{links.length === 0 ? (
				<EmptyList isLoading={isLoading} />
			) : (
				<div className="max-h-[23rem] overflow-auto scrollbar scrollbar-thumb-blue-base scrollbar-track-gray-100">
					{links.map((link) => (
						<ListItem key={link.id} link={link} />
					))}
				</div>
			)}
		</div>
	)
}

import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Link } from 'react-router-dom'
import { DeleteLinkRepositoryHttp } from '../../../infra/delete-link-repository-http'
import { UpdateAccessCountRepositoryHttp } from '../../../infra/update-access-count-repository-http'
import { useLinksStore } from '../../../store/links'
import { DeleteLinkUseCase } from '../../../usecases/delete-link-usecase/delete-link'
import type { ShortLink } from '../../../usecases/interfaces'
import { UpdateAccessCountUseCase } from '../../../usecases/update-access-count-usecase/update-access-count-usecase'
import { extractAliasFromUrl } from '../../../util'
import { Button } from '../../ui/button'
import { DeleteDialog } from './delete-dialog'

type ShortLinkProps = {
	link: ShortLink
}
export function ListItem({ link }: ShortLinkProps) {
	const { originalUrl, shortLink, accessCount, id } = link
	const { setToast, setToastOpen, baseUrl, removeLink, addLink } = useLinksStore((state) => state)

	function copyToClipboard() {
		navigator.clipboard.writeText(shortLink)
		setToast({
			title: 'Link Copied',
			message: 'The short link has been copied to your clipboard.',
			type: 'info',
			isOpen: false,
		})
		setToastOpen(true)
	}

	async function handleDeleteLink() {
		const linkCopy = { ...link }
		removeLink(id)
		const alias = extractAliasFromUrl(shortLink)
		try {
			await new DeleteLinkUseCase(new DeleteLinkRepositoryHttp(baseUrl)).execute(alias)
		} catch (_error) {
			setToast({
				title: 'Error',
				message: 'Failed to delete the link. Please try again.',
				type: 'error',
				isOpen: false,
			})
			setToastOpen(true)
			addLink(linkCopy)
		}
	}

	async function increaseAccessCount() {
		try {
			await new UpdateAccessCountUseCase(
				new UpdateAccessCountRepositoryHttp(baseUrl)
			).execute(extractAliasFromUrl(shortLink))
		} catch (_error) {
			setToast({
				title: 'Error',
				message: 'Failed to update access count. Please try again.',
				type: 'error',
				isOpen: false,
			})
			setToastOpen(true)
		}
	}

	return (
		<div className="flex justify-between border-t border-gray-200 py-4 gap-5">
			<div className="flex flex-col gap-1 max-w-[130px] md:max-w-[275px]">
				<Link
					onClick={increaseAccessCount}
					to={`/${extractAliasFromUrl(shortLink)}`}
					className="text-md font-semibold text-blue-base truncate hover:underline"
				>
					{shortLink}
				</Link>
				<span className="text-sm font-normal text-gray-500 truncate">{originalUrl}</span>
			</div>
			<div className="flex flex-row items-center gap-5">
				<span className="text-sm font-normal text-right text-gray-500">
					{accessCount} acessos
				</span>
				<div className="flex flex-row flex-nowrap items-center gap-1">
					<Button size="icon" onClick={copyToClipboard}>
						<CopyIcon size={16} />
					</Button>
					<AlertDialog.Root>
						<AlertDialog.Trigger asChild>
							<Button size="icon">
								<TrashIcon size={16} />
							</Button>
						</AlertDialog.Trigger>
						<DeleteDialog handleConfirmation={handleDeleteLink} />
					</AlertDialog.Root>
				</div>
			</div>
		</div>
	)
}

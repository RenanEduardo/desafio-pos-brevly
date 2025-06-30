import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { DeleteLinkRepositoryHttp } from '../../../infra/delete-link-repository-http'
import { useLinksStore } from '../../../store/links'
import { DeleteLinkUseCase } from '../../../usecases/delete-link-usecase/delete-link'
import type { ShortLink } from '../../../usecases/interfaces'
import { extractAliasFromUrl } from '../../../util'
import { Button } from '../../ui/button'
import { DeleteDialog } from './delete-dialog'

type ShortLinkProps = {
	link: ShortLink
}
export function ListItem({ link }: ShortLinkProps) {
	const { originalUrl, shortLink, accessCount } = link
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
		removeLink(shortLink)
		const alias = extractAliasFromUrl(shortLink)
		try {
			await new DeleteLinkUseCase(new DeleteLinkRepositoryHttp(baseUrl)).execute(alias)
		} catch (error) {
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

	return (
		<div className="flex justify-between border-t border-gray-200 py-4 gap-5">
			<div className="flex flex-col gap-1 max-w-[70%]">
				<span className="text-md font-semibold text-blue-base truncate">{shortLink}</span>
				<span className="text-sm font-normal text-gray-500 truncate">{originalUrl}</span>
			</div>
			<div className="flex flex-row items-center gap-5">
				<span className="text-sm font-normal text-right text-gray-500">{accessCount}</span>
				<div className="flex flex-row flex-wrap items-center gap-1">
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

import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import type { ShortLink } from '../../../usecases/interfaces'
import { Button } from '../../ui/button'

type ShortLinkProps = {
	link: ShortLink
}
export function ListItem({ link }: ShortLinkProps) {
	const { originalUrl, shortLink, accessCount } = link
	return (
		<div className="flex justify-between border-t border-gray-200 py-4 gap-5">
			<div className="flex flex-col gap-1 max-w-[70%]">
				<span className="text-md font-semibold text-blue-base truncate">{shortLink}</span>
				<span className="text-sm font-normal text-gray-500 truncate">{originalUrl}</span>
			</div>
			<div className="flex flex-row items-center gap-5">
				<span className="text-sm font-normal text-right text-gray-500">{accessCount}</span>
				<div className="flex flex-row flex-wrap items-center gap-1">
					<Button size="icon">
						<CopyIcon size={16} />
					</Button>
					<Button size="icon">
						<TrashIcon size={16} />
					</Button>
				</div>
			</div>
		</div>
	)
}

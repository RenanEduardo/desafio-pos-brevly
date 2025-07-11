import { LinkIcon } from '@phosphor-icons/react'

export function EmptyList() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 pt-8 pb-6 border-t border-gray-200">
			<LinkIcon size={32} className="text-gray-400" />
			<span className="text-xs overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-400 uppercase">
				ainda não existem links cadastrados
			</span>
		</div>
	)
}

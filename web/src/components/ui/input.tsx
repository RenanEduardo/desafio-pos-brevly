import { WarningIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
	label: string
	error: boolean
	errorMsg: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input(props: InputProps) {
	const { id, label, error, errorMsg, onChange, ...inputProps } = props

	return (
		<div className="flex flex-col gap-2 group" data-error={error}>
			<label htmlFor={id} className="flex flex-col items-start gap-2 ">
				<span className="text-xs font-normal uppercase text-gray-500 has-[input:focus]:text-blue-base has-[input:focus]:font-bold group-data-[error=true]:text-danger">
					{' '}
					{label}
				</span>
				<input
					className={`w-full h-12 py-0 px-4 justify-center gap-2 items-center rounded-lg border border-gray-300 overflow-hidden text-gray-400 text-ellipsis text-md font-normal focus:outline-[1.5px] focus:outline-blue-base focus:caret-blue-base group-data-[error=true]:border-danger`}
					{...inputProps}
					onChange={onChange}
				/>
			</label>
			{error && (
				<span className="inline-flex gap-2 items-center text-sm text-gray-500 font-normal">
					<WarningIcon size={16} className="text-danger" />
					{errorMsg}
				</span>
			)}
		</div>
	)
}

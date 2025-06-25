import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
	label: string;
};

export function Input(props: InputProps) {
	const { id, label } = props;

	return (
		<>
			<label
				htmlFor={id}
				className="flex flex-col items-start gap-2 font-brevly text-xs font-normal uppercase text-gray-500 has-[input:focus]:text-blue-base"
			>
				<span> {label}</span>
				<input
					className={`w-full h-12 py-0 px-4 justify-center gap-2 items-center rounded-lg border border-gray-300 overflow-hidden text-gray-400 text-ellipsis text-md font-normal focus:outline-[1.5px] focus:outline-blue-base focus:caret-blue-base`}
					{...props}
				/>
			</label>
		</>
	);
}

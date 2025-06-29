import * as Toast from '@radix-ui/react-toast'
import { tv, type VariantProps } from 'tailwind-variants'

const toastVariants = tv({
	base: 'fixed bottom-0 right-0 z-50 flex flex-col items-start p-4 border rounded m-4',

	variants: {
		type: {
			error: 'bg-danger-light border-danger text-danger',
			info: 'bg-blue-light border-blue-base text-gray-100',
		},
	},

	defaultVariants: {
		type: 'info',
	},
})

type ToastProps = VariantProps<typeof toastVariants> & {
	title: string
	message: string
	duration?: number
	isOpen?: boolean
	setOpen: (open: boolean) => void
}
export function FeedbackToast(props: ToastProps) {
	const { title, message, duration = Infinity, setOpen, isOpen } = props

	return (
		<Toast.Provider duration={duration ? duration : 3000}>
			<Toast.Root
				open={isOpen}
				onOpenChange={setOpen}
				className={toastVariants({ type: props.type })}
			>
				<Toast.Title className="font-bold">{title}</Toast.Title>
				<Toast.Description>{message}</Toast.Description>
			</Toast.Root>

			<Toast.Viewport />
		</Toast.Provider>
	)
}

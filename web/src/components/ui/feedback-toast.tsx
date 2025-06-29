import * as Toast from '@radix-ui/react-toast'

type ToastProps = {
	type: 'success' | 'error' | 'info'
	title: string
	message: string
	duration?: number
	isOpen?: boolean
	setOpen: (open: boolean) => void
}
export function FeedbackToast(props: ToastProps) {
	const { title, message, duration = 3000, setOpen, isOpen } = props
	return (
		<Toast.Provider duration={duration ? duration : 3000}>
			<Toast.Root
				open={isOpen}
				onOpenChange={setOpen}
				className="fixed bottom-0 right-0 z-50 flex flex-col items-start p-4 bg-danger-light border border-danger rounded text-danger"
			>
				<Toast.Title className="font-bold text-danger">{title}</Toast.Title>
				<Toast.Description>{message}</Toast.Description>
			</Toast.Root>

			<Toast.Viewport />
		</Toast.Provider>
	)
}

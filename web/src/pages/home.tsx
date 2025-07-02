import { AddNewLink } from '../components/add-link/add-new-link'
import { LinksList } from '../components/link-list/links-list'
import { FeedbackToast } from '../components/ui/feedback-toast'
import { Header } from '../components/ui/header'
import { useLinksStore } from '../store/links'

export function Home() {
	const { toast, setToastOpen } = useLinksStore((state) => state)

	return (
		<div className="min-h-screen flex md:items-center md:justify-center px-3 py-6 md:py-0">
			<FeedbackToast
				setOpen={setToastOpen}
				isOpen={toast.isOpen}
				title={toast.title}
				message={toast.message}
				type={toast.type}
			/>
			<div className="grid gap-6 w-full md:max-w-screen-lg">
				{/* Header */}
				<Header />

				{/* Content Area */}
				<div className="flex flex-col md:flex-row md:items-start md:gap-6 w-full gap-3">
					<AddNewLink />
					<LinksList />
				</div>
			</div>
		</div>
	)
}

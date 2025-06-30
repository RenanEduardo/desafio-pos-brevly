import brevlyLogo from '../../assets/Logo.svg'
import { AddNewLink } from '../components/add-link/add-new-link'
import { LinksList } from '../components/link-list/links-list'
import { FeedbackToast } from '../components/ui/feedback-toast'
import { useLinksStore } from '../store/links'

export function Home() {
	const { toast, setToastOpen } = useLinksStore((state) => state)

	return (
		<div className="min-h-screen w-full mx-auto flex flex-col items-center justify-center">
			<FeedbackToast
				setOpen={setToastOpen}
				isOpen={toast.isOpen}
				title={toast.title}
				message={toast.message}
				type={toast.type}
			/>
			<div className="flex flex-col px-3 md:px-0 gap-8 items-center">
				<div className="w-full float-left">
					<img className="h-[25px] w-[96px]" src={brevlyLogo} alt="Brevly logo" />
				</div>
				<div className="flex flex-row gap-5">
					<AddNewLink />
					<LinksList />
				</div>
			</div>
		</div>
	)
}

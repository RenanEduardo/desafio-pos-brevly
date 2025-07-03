import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FeedbackToast } from './components/ui/feedback-toast'
import { Home } from './pages/home'
import { NotFound } from './pages/not-found'
import { RedirectPage } from './pages/redirect-page'
import { useLinksStore } from './store/links'

export function App() {
	const { toast, setToastOpen } = useLinksStore((state) => state)

	return (
		<BrowserRouter>
			<div>
				<FeedbackToast
					setOpen={setToastOpen}
					isOpen={toast.isOpen}
					title={toast.title}
					message={toast.message}
					type={toast.type}
				/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:shortLink" element={<RedirectPage />} />
					<Route path="/404" element={<NotFound />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

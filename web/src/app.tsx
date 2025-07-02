import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { NotFound } from './pages/not-found'
import { RedirectPage } from './pages/redirect-page'

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:shortLink" element={<RedirectPage />} />
				<Route path="/404" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

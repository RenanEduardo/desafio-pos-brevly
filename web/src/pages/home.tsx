import { AddNewLink } from '../components/add-link/add-new-link'
import { LinksList } from '../components/link-list/links-list'
import { Header } from '../components/ui/header'

export function Home() {
	return (
		<div className="min-h-screen flex md:items-center md:justify-center px-3 py-6 md:py-0">
			<div className="grid gap-6 w-full md:max-w-screen-lg">
				<Header />
				<div className="flex flex-col md:flex-row md:items-start md:gap-6 w-full gap-3">
					<AddNewLink />
					<LinksList />
				</div>
			</div>
		</div>
	)
}

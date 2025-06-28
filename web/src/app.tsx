import brevlyLogo from "../assets/Logo.svg";
import { AddNewLink } from "./components/add-link/add-new-link";
import { LinksList } from "./components/link-list/links-list";

export function App() {
	return (
		<div className="min-h-screen w-full mx-auto flex flex-col items-center justify-center">
			<div className="flex flex-col px-3 md:px-0 gap-8 items-center">
				<div className="w-full float-left">
					<img
						className="h-[25px] w-[96px]"
						src={brevlyLogo}
						alt="Brevly logo"
					/>
				</div>
				<div className="flex flex-row gap-5">
					<AddNewLink />
					<LinksList />
				</div>
			</div>
		</div>
	);
}

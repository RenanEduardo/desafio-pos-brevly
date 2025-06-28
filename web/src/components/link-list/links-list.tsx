import { DownloadIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { ShortLink } from "./components/short-link";

export function LinksList() {
	return (
		<div className="w-[36.25rem] bg-gray-100 rounded-lg p-8">
			<div className="w-full inline-flex items-center justify-between mb-6">
				<span className="text-lg text-gray-600 font-bold">Meus Links</span>
				<Button size="secondary">
					<DownloadIcon size={16} />
					Baixar CSV
				</Button>
			</div>
			<div>
				<ShortLink />
				<ShortLink />
				<ShortLink />
				<ShortLink />
				<ShortLink />
			</div>
		</div>
	);
}

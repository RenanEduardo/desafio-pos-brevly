import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";

export function AddNewLink() {
	const [originalLinkInput, setOriginalLinkInput] = useState("");
	const [aliasInput, setAliasInputInput] = useState("");
	return (
		<div className="w-[23.75rem] h-fit bg-gray-100 rounded-lg flex flex-col gap-6 p-8">
			<span className="text-lg font-bold text-gray-600">Novo Link</span>
			<div>
				<Input
					id="original-link"
					type="text"
					label="Link Original"
					placeholder="link original"
					value={originalLinkInput}
					onChange={(e) => setOriginalLinkInput(e.target.value)}
				/>
			</div>
			<div>
				<Input
					id="shortened-link"
					type="text"
					label="Link Encurtado"
					value={aliasInput}
					onChange={(e) => setAliasInputInput(e.target.value)}
				/>
			</div>
			<Button>Salvar link</Button>
		</div>
	);
}

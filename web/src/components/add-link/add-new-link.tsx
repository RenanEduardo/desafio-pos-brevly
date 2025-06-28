import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { AddLinkUseCase } from "../../usecases/add-link-usecase/add-link";
import { AddLinkRepositoryHttp } from "../../infra/add-link-repository";

export function AddNewLink() {
	const [originalLinkInput, setOriginalLinkInput] = useState("");
	const [originalLinkError, setOriginalLinkError] = useState({
		error: false,
		message: "",
	});
	const [aliasInput, setAliasInput] = useState("");
	const [aliasError, setAliasError] = useState({ error: false, message: "" });

	function isValidInput(input: string): boolean {
		if (input.trim() === "") return false;
		return true;
	}

	async function handleAddLink() {
		if (!isValidInput(originalLinkInput)) {
			setOriginalLinkError({
				error: true,
				message: "O link original não pode estar vazio.",
			});
			return;
		}
		if (!isValidInput(aliasInput)) {
			setAliasError({
				error: true,
				message: "O link encurtado não pode estar vazio.",
			});
			return;
		}

		const url =
			originalLinkInput.startsWith("http") ||
			originalLinkInput.startsWith("https")
				? originalLinkInput
				: `https://${originalLinkInput}`;

		const response = await new AddLinkUseCase(
			new AddLinkRepositoryHttp(),
		).execute({
			url,
			alias: aliasInput,
		});
	}

	return (
		<div className="w-[23.75rem] h-fit bg-gray-100 rounded-lg flex flex-col gap-6 p-8">
			<span className="text-lg font-bold text-gray-600">Novo Link</span>
			<div>
				<Input
					id="original-link"
					type="text"
					label="Link Original"
					placeholder="www.exemplo.com"
					value={originalLinkInput}
					onChange={(e) => {
						setOriginalLinkInput(e.target.value);
						if (originalLinkError.error)
							setOriginalLinkError({ error: false, message: "" });
					}}
					error={originalLinkError.error}
					errorMsg={originalLinkError.message}
				/>
			</div>
			<div>
				<Input
					id="shortened-link"
					type="text"
					label="Link Encurtado"
					placeholder="brev.ly/"
					value={aliasInput}
					onChange={(e) => {
						setAliasInput(e.target.value);
						if (aliasError.error) setAliasError({ error: false, message: "" });
					}}
					error={aliasError.error}
					errorMsg={aliasError.message}
				/>
			</div>
			<Button onClick={handleAddLink}>Salvar link</Button>
		</div>
	);
}

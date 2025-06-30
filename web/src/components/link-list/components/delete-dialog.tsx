import * as AlertDialog from '@radix-ui/react-alert-dialog'

type DeleteDialogProps = {
	handleConfirmation: () => void
}
export function DeleteDialog({ handleConfirmation }: DeleteDialogProps) {
	return (
		<AlertDialog.Portal>
			<AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
			<AlertDialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg">
				<AlertDialog.Title className="text-lg font-semibold text-gray-900">
					Tem certeza que deseja excluir?
				</AlertDialog.Title>
				<AlertDialog.Description className="mt-2 text-sm text-gray-600">
					Esta ação é irreversível. O item será permanentemente removido.
				</AlertDialog.Description>

				<div className="mt-4 flex justify-end gap-2">
					<AlertDialog.Cancel asChild>
						<button
							type="button"
							className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
						>
							Cancelar
						</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button
							type="button"
							className="px-4 py-2 rounded bg-danger text-white hover:bg-red-700"
							onClick={handleConfirmation}
						>
							Confirmar
						</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	)
}

import { Link } from 'react-router-dom'
import NotFoundLogo from '../../assets/404.svg'
export function NotFound() {
	return (
		<div className="min-h-screen w-full mx-auto flex flex-col items-center justify-center px-3">
			<div className="flex flex-col items-center justify-center text-center gap-6 md:w-[36.25rem] rounded-lg bg-gray-100 px-12 py-16">
				<img
					src={NotFoundLogo}
					alt="Página não encontrada"
					className="w-[12.125rem] h-[5.3125rem]"
				/>
				<span className="text-xl font-bold text-gray-600 text-center">
					Link não encontrado
				</span>
				<span className="text-md text-gray-500 font-semibold text-center">
					O link que você está tentando acessar não existe, foi removido ou é uma URL
					inválida. Saiba mais em{' '}
					<Link to="/" className=" text-blue-base decoration-solid underline">
						brev.ly
					</Link>
					.
				</span>
			</div>
		</div>
	)
}

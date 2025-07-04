import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import brevlyLogoIcon from '../../assets/Logo_Icon.svg'
import { GetLinkRepositoryHttp } from '../infra/get-link-repository-http'
import { useLinksStore } from '../store/links'
import { GetLinkUseCase } from '../usecases/get-link-usecase/get-link-usecase'
import { UpdateAccessCountUseCase } from '../usecases/update-access-count-usecase/update-access-count-usecase'
import { UpdateAccessCountRepositoryHttp } from '../infra/update-access-count-repository-http'

export function RedirectPage() {
	const location = useLocation()
	const navigate = useNavigate()
	const [url, setUrl] = useState('#')
	const { baseUrl, setToast,setToastOpen } = useLinksStore((state) => state)
	const hasExecuted = useRef(false)

	async function increaseAccessCount(id:string) {
		try {
				await new UpdateAccessCountUseCase(
				new UpdateAccessCountRepositoryHttp(baseUrl)
			).execute(id)
		} catch (_error) {
			setToast({
				title: 'Error',
				message: 'Failed to update access count. Please try again.',
				type: 'error',
				isOpen: false,
			})
			setToastOpen(true)
		}
	}

	useEffect(() => {

		if(hasExecuted.current) return
		hasExecuted.current = true
		
		async function redirectToOriginalUrl() {
			const alias = location.pathname.slice(1)

			try {
				const {originalUrl, id} = await new GetLinkUseCase(
					new GetLinkRepositoryHttp(baseUrl)
				).execute(alias)

				setUrl(originalUrl)
				await increaseAccessCount(id)
				window.location.href = originalUrl
			} catch (_error) {
				navigate('/404')
			}
		}

		redirectToOriginalUrl()
	}, [baseUrl, navigate, location.pathname])


	return (
		<div className="min-h-screen w-full mx-auto flex flex-col items-center justify-center px-3">
			<div className="flex flex-col items-center justify-center py-16 px-12 gap-6 rounded-lg bg-gray-100 ">
				<img className="h-12 w-12" src={brevlyLogoIcon} alt="Brevly logo" />
				<span className="text-xl font-bold text-center text-gray-600">
					Redirecionando...
				</span>
				<div className="flex flex-col text-md text-gray-500 font-semibold text-center">
					<span>O link será aberto automaticamente em alguns instantes. </span>
					<span>
						Não foi redirecionado?{' '}
						<a className="text-blue-base underline decoration-solid" href={url}>
							Acesse aqui
						</a>
					</span>
				</div>
			</div>
		</div>
	)
}

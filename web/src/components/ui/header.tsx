import brevlyLogo from '../../../assets/Logo.svg'

export function Header() {
	return (
		<div className="md:w-full flex items-center justify-center md:justify-start mt-8 mb-6 md:mb-8 ">
			<img className="h-[25px] w-[96px]" src={brevlyLogo} alt="Brevly logo" />
		</div>
	)
}

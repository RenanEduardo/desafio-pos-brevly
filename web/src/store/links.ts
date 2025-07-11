import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ShortLink } from '../usecases/interfaces'

type StoreState = {
	links: ShortLink[]
	baseUrl: string
	toast: ToastState
	brevlyUrl: string
	isLoading: boolean
}

type StoreActions = {
	setLinks: (links: ShortLink[]) => void
	addLink: (link: ShortLink) => void
	removeLink: (id: string) => void
	updateLink: (shortlink: string, updatedLink: ShortLink) => void
	setToast: (toast: ToastState) => void
	setToastOpen: (isOpen: boolean) => void
	setIsLoading: (isLoading: boolean) => void
}

type ToastState = {
	 title: string
		message: string
		type: 'error' | 'info'
		isOpen: boolean
}

export const useLinksStore = create<StoreState & StoreActions>()(devtools((set) => {
	return {
		links: [],
		setLinks: (links) => set({ links }),
		addLink: (link) => set((state) => ({ links: [...state.links, link] })),
		removeLink: (id) =>
			set((state) => ({
				links: state.links.filter((link) => link.id !== id),
			})),
		updateLink: (shortlink, updatedLink) =>
			set((state) => ({
				links: state.links.map((link) => 
					link.shortLink === shortlink ? updatedLink : link
				),
			})),
		brevlyUrl: import.meta.env.VITE_FRONTEND_URL,
		baseUrl: `${import.meta.env.VITE_BACKEND_URL}/links`,
		setToast: (toast) => set({ toast }),
		setToastOpen: (isOpen: boolean) => set((state) => ({
			toast: {
				...state.toast,
				isOpen,
			}
		})),
		setIsLoading: (isLoading) => set({ isLoading }),
		// Default toast state
		toast: {
			title: '',
			message: '',
			type: 'info',
			isOpen: false,
		}
	}
}))

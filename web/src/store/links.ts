import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ShortLink } from '../usecases/interfaces'

type StoreState = {
	links: ShortLink[]
	baseUrl: string
	toast: ToastState
}

type StoreActions = {
	setLinks: (links: ShortLink[]) => void
	addLink: (link: ShortLink) => void
	removeLink: (shortlink: string) => void
	updateLink: (shortlink: string, updatedLink: ShortLink) => void
	setToast: (toast: ToastState) => void
	setToastOpen: (isOpen: boolean) => void
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
		removeLink: (shortlink) =>
			set((state) => ({
				links: state.links.filter((link) => link.shortLink !== shortlink),
			})),
		updateLink: (shortlink, updatedLink) =>
			set((state) => ({
				links: state.links.map((link) =>
					link.shortLink === shortlink ? updatedLink : link
				),
			})),
		baseUrl: `${import.meta.env.VITE_BACKEND_URL}/links`,
		setToast: (toast) => set({ toast }),
		setToastOpen: (isOpen: boolean) => set((state) => ({
			toast: {
				...state.toast,
				isOpen,
			}
		})),
		// Default toast state
		toast: {
			title: '',
			message: '',
			type: 'info',
			isOpen: false,
		}
	}
}))

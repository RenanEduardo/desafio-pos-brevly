import { create } from "zustand";
import type { ShortLink } from "../usecases/interfaces";


type StoreState = {
 links: ShortLink[];
 baseUrl:string
}

type StoreActions = {
 setLinks: (links: ShortLink[]) => void;
 addLink: (link: ShortLink) => void;
 removeLink: (shortlink: string) => void;
 updateLink: (shortlink: string, updatedLink: ShortLink) => void;
}

export const useLinksStore = create<StoreState & StoreActions>((set) => {
 return {
  links: [],
  setLinks: (links) => set({ links }),
  addLink: (link) => set((state) => ({ links: [...state.links, link] })),
  removeLink: (shortlink) => set((state) => ({
   links: state.links.filter(link => link.shortLink !== shortlink)
  })),
  updateLink: (shortlink, updatedLink) => set((state) => ({
   links: state.links.map(link =>
    link.shortLink === shortlink ? updatedLink : link
   )
  })),
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/links`
 };
}) 
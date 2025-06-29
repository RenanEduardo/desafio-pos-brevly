import { z } from 'zod';

export const LinkSchema = z.object({
  url: z.string().url(),
  alias: z.string().min(1),
  accessCount: z.number().int().nonnegative().optional(),
});

export type Link = z.infer<typeof LinkSchema>;


export const ShortLinkSchema = z.object({
  id: z.string(),
  originalUrl: z.string().url(),
  shortLink: z.string(),
  accessCount: z.number()
})

export type ShortLink = z.infer<typeof ShortLinkSchema>;

export const AddLinkResponseSchema = z.object({
  shortLink: z.string(),
  accessCount: z.number()
})

export type AddLinkResponse = z.infer<typeof AddLinkResponseSchema>;


export const ListLinksResponseSchema = z.object({
  links: z.array(ShortLinkSchema),
});

export type ListLinksResponse = z.infer<typeof ListLinksResponseSchema>;
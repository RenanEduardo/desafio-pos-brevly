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
  id: z.string(),
  shortLink: z.string(),
  accessCount: z.number()
})

export type AddLinkResponse = z.infer<typeof AddLinkResponseSchema>;


export const ListLinksResponseSchema = z.object({
  links: z.array(ShortLinkSchema),
});

export type ListLinksResponse = z.infer<typeof ListLinksResponseSchema>;


export const ExportLinksResponseSchema = z.string().url();

export type ExportLinksResponse = z.infer<typeof ExportLinksResponseSchema>;

export const GetLinkResponseSchema = z.object({
  originalUrl: z.string().url(),
  id: z.string(),
});

export type GetLinkResponse = z.infer<typeof GetLinkResponseSchema>;
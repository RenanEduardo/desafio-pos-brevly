import { z } from 'zod';

export const LinkSchema = z.object({
  id: z.string().optional(),
  url: z.string().url(),
  alias: z.string().min(1),
  accessCount: z.number().int().nonnegative().optional(),
});

export type Link = z.infer<typeof LinkSchema>;



export const AddLinkResponseSchema = z.object({
  shortLink: z.string(),
  accessCount: z.number()
})

export type AddLinkResponse = z.infer<typeof AddLinkResponseSchema>;
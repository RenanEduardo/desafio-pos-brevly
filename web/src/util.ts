import { z } from "zod";

export function extractAliasFromUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname.replace(/^\//, "");
  } catch {
    return "";
  }
}
export async function downloadUrl(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function isAcceptableAlias(alias: string): boolean {

  const aliasRegex = /^[a-zA-Z0-9-_]+$/;
  const aliasSchema = z.string().regex(aliasRegex, {
    message: "Alias inválido",
  });

  try {
    aliasSchema.parse(alias);
    return true;
  } catch (_error) {
    return false;
  }
}

export function isAcceptableUrl(url: string): boolean {
  const urlLikeRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+\/?$/;
  const urlLikeSchema = z.string().regex(urlLikeRegex, {
    message: "URL inválida",
  });

  try {
    urlLikeSchema.parse(url)
    return true
  } catch (_error) {
    return false
  }
}
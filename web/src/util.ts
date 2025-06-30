// Extrai o alias de uma URL no formato "https://brev.ly/alias"
export function extractAliasFromUrl(url: string): string {
  try {
    const u = new URL(url);
    // Remove barra inicial, se houver
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

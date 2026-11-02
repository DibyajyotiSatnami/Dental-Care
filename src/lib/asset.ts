/**
 * Prefix a root-relative public file path ("/videos/x.mp4") with the deploy base path.
 * Needed when the site is served from a sub-folder, e.g. GitHub Pages:
 * https://<user>.github.io/<repo>/  →  NEXT_PUBLIC_BASE_PATH="/<repo>".
 */
export function asset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + path;
}

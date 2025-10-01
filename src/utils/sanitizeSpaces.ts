export function sanitizeSpaces(str: string): string {
	return str.replace(/\s{2,}/g, " ").trim();
}

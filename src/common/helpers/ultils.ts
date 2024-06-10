export function getFullUrl(path?: string): string {
	if (!path) {
		return null;
	}

	if (!path.startsWith("http")) {
		return `${process.env.API_BASE_URL}/${path}`;
	}
	return path;
}

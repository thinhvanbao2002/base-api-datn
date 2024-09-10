import bcrypt from "bcrypt";

export function getFullUrl(path?: string): string {
	if (!path) {
		return null;
	}

	if (!path.startsWith("http")) {
		return `${process.env.API_BASE_URL}/${path}`;
	}
	return path;
}

export function validateHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
	if (!password || !hash) {
		return Promise.resolve(false);
	}

	return bcrypt.compare(password, hash);
}

export interface LoginCredentials {
	username: string;
	password: string;
}

export interface LoginResponse {
	access_token: string;
	refresh_token?: string;
	agent?: {
        id: string;
        username: string;
        roleId: string;
        centreId: string;
    };
}

const API_URL = import.meta.env.VITE_API_URL ?? '';

/** Authentifie un utilisateur auprès de l'API. */
export async function login(
	credentials: LoginCredentials,
): Promise<LoginResponse> {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});
    console.log(response)
	if (!response.ok) {
		let message = 'Échec de la connexion';

		try {
			const error = (await response.json()) as { message?: string };
			if (error.message) message = error.message;
		} catch {
			// La réponse peut ne pas contenir de JSON.
		}

		throw new Error(message);
	}
    const res = await response.json();
	return res as LoginResponse;
}

/** Déconnecte l'utilisateur auprès de l'API en invalidant son refresh token. */
export async function logout(refreshToken: string): Promise<void> {
	const response = await fetch(`${API_URL}/auth/logout`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refresh_token: refreshToken }),
	});

	if (!response.ok) {
		throw new Error('Échec de la déconnexion');
	}
}

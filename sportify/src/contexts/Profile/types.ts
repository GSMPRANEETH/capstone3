type Preferences = {};
export interface UserPayload {
	id: number;
	name: string;
	email: string;
	preferences: Preferences;
}

export interface PasswordPayload {
	current_password: string;
	new_password: string;
}

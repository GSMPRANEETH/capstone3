import React, { createContext, useCallback, useContext, useState } from "react";

interface AuthUser {
	id: number;
	name: string;
	email: string;
}

interface AuthState {
	isAuthenticated: boolean;
	token: string | null;
	user: AuthUser | null;
	signIn: (token: string, user: AuthUser) => void;
	signOut: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [{ token, user }, setAuthState] = useState<{
		token: string | null;
		user: AuthUser | null;
	}>(() => {
		const storedToken = localStorage.getItem("authToken");
		const userData = localStorage.getItem("userData");
		try {
			const parsedUser = userData ? (JSON.parse(userData) as AuthUser) : null;
			if (!storedToken || !parsedUser) {
				return { token: null, user: null };
			}
			return { token: storedToken, user: parsedUser };
		} catch {
			localStorage.removeItem("userData");
			localStorage.removeItem("authToken");
			return { token: null, user: null };
		}
	});

	const signIn = useCallback((newToken: string, newUser: AuthUser) => {
		localStorage.setItem("authToken", newToken);
		localStorage.setItem("userData", JSON.stringify(newUser));
		setAuthState({ token: newToken, user: newUser });
	}, []);

	const signOut = useCallback(() => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("userData");
		setAuthState({ token: null, user: null });
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated: !!token, token, user, signIn, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};

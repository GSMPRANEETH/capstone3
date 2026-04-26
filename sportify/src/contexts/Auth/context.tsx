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
	const [token, setToken] = useState<string | null>(
		() => localStorage.getItem("authToken")
	);
	const [user, setUser] = useState<AuthUser | null>(() => {
		const userData = localStorage.getItem("userData");
		try {
			return userData ? JSON.parse(userData) : null;
		} catch {
			return null;
		}
	});

	const signIn = useCallback((newToken: string, newUser: AuthUser) => {
		localStorage.setItem("authToken", newToken);
		localStorage.setItem("userData", JSON.stringify(newUser));
		setToken(newToken);
		setUser(newUser);
	}, []);

	const signOut = useCallback(() => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("userData");
		setToken(null);
		setUser(null);
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

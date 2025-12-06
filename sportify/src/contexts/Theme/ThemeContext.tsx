import React, { createContext, useEffect, useState } from "react";

interface ThemeContextProps {
	theme: string;
	setTheme: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
	theme: "light",
	setTheme: () => {},
});

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState(
		() => localStorage.getItem("theme") || "light"
	);

	useEffect(() => {
		localStorage.setItem("theme", theme);
	}, [theme]);

	const valueToShare = {
		theme: theme,
		setTheme: setTheme,
	};

	return (
		<ThemeContext.Provider value={valueToShare}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };

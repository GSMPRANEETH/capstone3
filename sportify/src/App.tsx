import { RouterProvider } from "react-router-dom";
import router from "./utls/routes";
import { useContext } from "react";
import { ThemeContext } from "./contexts/Theme/ThemeContext";
import { ArticlesProvider } from "./contexts/Articles/context";
import { MatchesProvider } from "./contexts/Matches/context";
import { PreferencesProvider } from "./contexts/Preferences/context";

function App() {
	const { theme } = useContext(ThemeContext);
	return (
		<div
			className={`h-screen w-full mx-auto py-2 ${
				theme === "dark" ? "dark" : ""
			}`}
		>
			<PreferencesProvider>
				<ArticlesProvider>
					<MatchesProvider>
						<RouterProvider router={router} />
					</MatchesProvider>
				</ArticlesProvider>
			</PreferencesProvider>
		</div>
	);
}

export default App;

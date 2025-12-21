import { RouterProvider } from "react-router-dom";
import router from "./utls/routes";
import { Suspense, useContext } from "react";
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
						<Suspense fallback={<p>Loading...</p>}>
							<RouterProvider router={router} />
						</Suspense>
					</MatchesProvider>
				</ArticlesProvider>
			</PreferencesProvider>
		</div>
	);
}

export default App;

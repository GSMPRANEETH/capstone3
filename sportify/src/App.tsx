import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useContext } from "react";
import { ThemeContext } from "./contexts/Theme/ThemeContext";

function App() {
	const { theme } = useContext(ThemeContext);
	return (
		<div
			className={`h-screen w-full mx-auto py-2 ${
				theme === "dark" ? "dark" : ""
			}`}
		>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;

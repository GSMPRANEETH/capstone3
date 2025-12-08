import { createBrowserRouter, Navigate } from "react-router-dom";
import AccountLayout from "../components";
import Signin from "../views/Signin";
import Signup from "../views/Signup";
import Logout from "../views/Signout";
import { Home } from "../views/Home";
import { Profile } from "../views/Profile";
import { ArticleDetails } from "../views/Articles/ArticleDetails";
import { MatchDetails } from "../views/Matches/MatchDetails";
import { Preferences } from "../views/Preferences";
import NotFound from "../views/404";

const router = createBrowserRouter([
	{ path: "/signin", element: <Signin /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/signout", element: <Logout /> },
	{
		path: "/",
		element: <AccountLayout />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "/user",
				element: <Home />,
				children: [
					{ index: true, element: <Navigate to="../" replace /> },
					{ path: "profile", element: <Profile /> },
					{ path: "preferences", element: <Preferences /> },
				],
			},
			{
				path: "/article",
				element: <Home />,
				children: [
					{ index: true, element: <Navigate to="../" replace /> },
					{ path: ":articleID", element: <ArticleDetails /> },
				],
			},
			{
				path: "/match",
				element: <Home />,
				children: [
					{ index: true, element: <Navigate to="../" replace /> },
					{ path: ":matchID", element: <MatchDetails /> },
				],
			},
			{ path: "*", element: <NotFound /> },
		],
	},
]);

export default router;

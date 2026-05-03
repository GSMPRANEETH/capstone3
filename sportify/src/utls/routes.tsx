import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
const AccountLayout = lazy(() => import("../components"));
const Signin = lazy(() => import("../views/Signin"));
const Signup = lazy(() => import("../views/Signup"));
const Logout = lazy(() => import("../views/Logout"));
const Home = lazy(() =>
	import("../views/Home").then((m) => ({ default: m.Home }))
);
const Profile = lazy(() =>
	import("../views/Profile").then((m) => ({ default: m.Profile }))
);
const ArticleDetails = lazy(() =>
	import("../views/Articles/ArticleDetails").then((m) => ({
		default: m.ArticleDetails,
	}))
);
const MatchDetails = lazy(() =>
	import("../views/Matches/MatchDetails").then((m) => ({
		default: m.MatchDetails,
	}))
);
const Preferences = lazy(() =>
	import("../views/Preferences").then((m) => ({ default: m.Preferences }))
);
const NotFound = lazy(() => import("../views/404"));

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
				element: <ProtectedRoute />,
				children: [
					{
						element: <Home />,
						children: [
							{ index: true, element: <Navigate to="/" replace /> },
							{ path: "profile", element: <Profile /> },
							{ path: "preferences", element: <Preferences /> },
						],
					},
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

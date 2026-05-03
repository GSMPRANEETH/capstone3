import React, { useEffect, Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { getUserPreferences } from "../../contexts/Preferences/actions";
import { usePreferencesDispatch } from "../../contexts/Preferences/context";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAuth } from "@/contexts/Auth/context";

const Articles = lazy(() =>
	import("../Articles").then((m) => ({ default: m.Articles }))
);
const Matches = lazy(() =>
	import("../Matches").then((m) => ({ default: m.Matches }))
);
const Favourites = lazy(() =>
	import("../Favourites").then((m) => ({ default: m.Favourites }))
);

export const Home: React.FC = () => {
	const preferencesDispatch = usePreferencesDispatch();
	const { isAuthenticated: isAuth } = useAuth();
	useEffect(() => {
		if (isAuth) {
			getUserPreferences(preferencesDispatch);
		}
	}, [isAuth]);
	return (
		<>
			<ErrorBoundary>
				<Suspense fallback={<p>Loading matches...</p>}>
					<Matches />
				</Suspense>
			</ErrorBoundary>
			<div className="flex gap-4">
				<div className="w-3/4">
					<ErrorBoundary>
						<Suspense fallback={<p>Loading articles...</p>}>
							<Articles />
						</Suspense>
					</ErrorBoundary>
				</div>
				<div className="w-1/4">
					<ErrorBoundary>
						<Suspense fallback={<p>Loading favourites...</p>}>
							<Favourites />
						</Suspense>
					</ErrorBoundary>
				</div>
			</div>
			<Outlet />
		</>
	);
};

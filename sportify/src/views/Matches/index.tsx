import ErrorBoundary from "@/components/ErrorBoundary";
import React, { Suspense } from "react";
const MatchesList = React.lazy(() =>
	import("./MatchesList").then((m) => ({ default: m.MatchesList }))
);
import { Outlet } from "react-router-dom";

export const Matches: React.FC = () => {
	return (
		<div className="gap-4 flex flex-col">
			<p className="text-4xl">Games</p>
			<ErrorBoundary>
				<Suspense fallback={<p>Loading matches...</p>}>
					<MatchesList />
				</Suspense>
			</ErrorBoundary>
			<Outlet />
		</div>
	);
};

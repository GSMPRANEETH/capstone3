import ErrorBoundary from "@/components/ErrorBoundary";
import React, { Suspense, lazy } from "react";
const ArticlesList = React.lazy(() =>
	import("./ArticlesList").then((m) => ({ default: m.ArticlesList }))
);
import { Outlet } from "react-router-dom";

export const Articles: React.FC = () => {
	return (
		<div className="gap-4 flex flex-col">
			<p className="text-4xl">Trending News</p>
			<ErrorBoundary>
				<Suspense fallback={<p>Loading articles...</p>}>
					<ArticlesList />
				</Suspense>
			</ErrorBoundary>
			<Outlet />
		</div>
	);
};

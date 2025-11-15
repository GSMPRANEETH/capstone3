import React from "react";
import { Articles } from "../Articles";
export const Home: React.FC = () => {
	return (
		<>
			<div className="flex flex-col gap-4 items-center justify-center">
				<p className="text-8xl">Home page</p>
			</div>
			<Articles />
		</>
	);
};

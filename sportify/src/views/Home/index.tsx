import React from "react";
import { Articles } from "../Articles";
import { Sports } from "../Sports";
export const Home: React.FC = () => {
	return (
		<>
			<Sports />
			<Articles />
		</>
	);
};

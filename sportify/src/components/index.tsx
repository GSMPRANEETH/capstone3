import * as React from "react";
import Appbar from "./Appbar.tsx";
import { Outlet } from "react-router-dom";

const AccountLayout: React.FC = () => {
	return (
		<>
			<Appbar />
			<main>
				<div className="mx-auto max-w-7xl py-6 sm:p06 lg:px-8">
					<Outlet />
				</div>
			</main>
		</>
	);
};

export default AccountLayout;

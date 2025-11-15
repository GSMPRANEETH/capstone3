import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout: React.FC = () => {
	useEffect(() => {
		localStorage.clear();
	});
	return <Navigate to="/signin" />;
};
export default Logout;

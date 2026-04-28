import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth/context";

const Logout: React.FC = () => {
	const { signOut } = useAuth();
	useEffect(() => {
		signOut();
	}, []);
	return <Navigate to="/" />;
};
export default Logout;

import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate("/");
	};
	return (
		<>
			<div className="min-h-screen flex flex-col items-center justify-center space-y-4">
				<h1 className="text-8xl font-bold">404</h1>
				<h2 className="text-xl font-semibold">Page not found</h2>
				<button
					onClick={handleNavigate}
					className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
					type="button"
				>
					Back to home
				</button>
			</div>
		</>
	);
};

export default NotFound;

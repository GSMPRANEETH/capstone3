import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../utls/constants";
import { createUser } from "../../contexts/Authentication/actions";
const SignupForm: React.FC = () => {
	const navigate = useNavigate();

	type Inputs = {
		userName: string;
		userEmail: string;
		userPassword: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data);
		const name = data.userName;
		const email = data.userEmail;
		const password = data.userPassword;
		await createUser(name, email, password);
		navigate("/");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Your Name:
				</label>
				<input
					type="text"
					id="userName"
					{...register("userName", { required: true })}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
						errors.userName ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userName && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						User name is required
					</span>
				)}
			</div>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">Email:</label>
				<input
					type="email"
					id="userEmail"
					{...register("userEmail", { required: true })}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
						errors.userEmail ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userEmail && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						Email is required
					</span>
				)}
			</div>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Password:
				</label>
				<input
					type="password"
					id="userPassword"
					{...register("userPassword", { required: true })}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
						errors.userPassword ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userPassword && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						Create a password
					</span>
				)}
			</div>
			<button
				type="submit"
				className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
			>
				Sign up
			</button>
			<button
				type="button"
				className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
				onClick={() => {
					navigate("/signin");
				}}
			>
				Already have an account? Sign in here
			</button>
		</form>
	);
};

export default SignupForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signInUser } from "../../services/auth";
import { useAuth } from "../../contexts/Auth/context";

const SigninForm: React.FC = () => {
	type Inputs = {
		email: string;
		password: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [serverError, setServerError] = useState<string | null>(null);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setServerError(null);
		try {
			const result = await signInUser(data.email, data.password);
			signIn(result.auth_token, result.user);
			navigate("/");
		} catch (err) {
			setServerError((err as Error).message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{serverError && (
				<div className="text-red-600 dark:text-red-400 mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
					{serverError}
				</div>
			)}
			<div>
				<label className="block text-gray-700 font-semibold mb-2">Email:</label>
				<input
					type="email"
					id="email"
					{...register("email", { required: true })}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline-blue ${
						errors.email ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.email && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						Invalid Email
					</span>
				)}
			</div>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Password:
				</label>
				<input
					type="password"
					id="password"
					{...register("password", { required: true })}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline-blue ${
						errors.password ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.password && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						Invalid Password
					</span>
				)}
			</div>
			<button
				type="submit"
				className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
			>
				Sign In
			</button>
			<button
				type="button"
				className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
				onClick={() => {
					navigate("/signup");
				}}
			>
				No account? Sign up here
			</button>
		</form>
	);
};

export default SigninForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createUser } from "../../services/auth";
import { useAuth } from "../../contexts/Auth/context";

// OWASP password strength: min 8 chars, uppercase, lowercase, digit, special char
const OWASP_PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).{8,}$/;

const SignupForm: React.FC = () => {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [serverError, setServerError] = useState<string | null>(null);

	type Inputs = {
		userName: string;
		userEmail: string;
		userPassword: string;
		confirmPassword: string;
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setServerError(null);
		if (data.userPassword !== data.confirmPassword) {
			setServerError("Passwords do not match");
			return;
		}
		try {
			const result = await createUser(data.userName, data.userEmail, data.userPassword);
			signIn(result.auth_token, result.user);
			navigate("/user/preferences");
		} catch (err) {
			setServerError((err as Error).message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{serverError && (
				<div className="text-red-600 dark:text-red-400 mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800" role="alert" aria-live="assertive">
					{serverError}
				</div>
			)}
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Your Name:
				</label>
				<input
					type="text"
					id="userName"
					{...register("userName", { required: true })}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline-blue ${
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
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline-blue ${
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
					{...register("userPassword", {
						required: "Password is required",
						validate: (value) =>
							OWASP_PASSWORD_REGEX.test(value) ||
							"Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
					})}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline-blue ${
						errors.userPassword ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.userPassword && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						{errors.userPassword.message}
					</span>
				)}
				<p className="text-xs text-gray-500 mt-1">
					At least 8 characters with uppercase, lowercase, number, and special character (e.g. !@#$)
				</p>
			</div>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Confirm Password:
				</label>
				<input
					type="password"
					id="confirmPassword"
					{...register("confirmPassword", {
						required: "Please confirm your password",
						validate: (value) =>
							value === watch("userPassword") || "Passwords do not match",
					})}
					className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline-blue ${
						errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""
					}`}
				/>
				{errors.confirmPassword && (
					<span className="text-red-600 dark:text-red-400 mb-2 block">
						{errors.confirmPassword.message}
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

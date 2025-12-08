import { Transition, Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { API_ENDPOINT } from "../../utls/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	getUserDetails,
	updateUserPassword,
} from "../../contexts/Profile/actions";
import { PasswordPayload, UserPayload } from "../../contexts/Profile/types";

export const Profile: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [change, setChange] = useState(false);

	interface FormData {
		current_password: string;
		new_password: string;
		confirm_password: string;
	}

	const navigate = useNavigate();
	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const onSubmit: SubmitHandler<PasswordPayload> = async (data) => {
		await updateUserPassword(data);
		alert("Password changed successfully");
		closeModal();
	};
	const [user, setUser] = useState<UserPayload>({} as UserPayload);
	const obtainUser = async () => {
		const userData = await getUserDetails();
		setUser(userData);
	};
	useEffect(() => {
		obtainUser();
	}, []);
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Your Profile
									</Dialog.Title>

									<div>
										<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
											<p className="text-lg mb-2">
												<strong>Name:</strong> {user.name}
											</p>
											<p className="text-lg mb-2">
												<strong>Email:</strong> {user.email}
											</p>
										</div>
										{!change && (
											<div>
												<button
													type="button"
													onClick={closeModal}
													className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
												>
													Close
												</button>
												<button
													type="button"
													onClick={() => setChange(true)}
													className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
												>
													Change Password
												</button>
											</div>
										)}
										{change && (
											<form onSubmit={handleSubmit(onSubmit)}>
												<h3>
													<strong>Current Password</strong>
												</h3>
												<input
													type="password"
													placeholder="Enter Current Password"
													id="current_password"
													{...register("current_password", { required: true })}
													className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline-blue ${
														errors.current_password
															? "border-red-500 focus:border-red-500"
															: ""
													}`}
												/>
												{errors.current_password && (
													<span className="text-red-600 dark:text-red-400 mb-2 block">
														Enter your current password
													</span>
												)}
												<h3>
													<strong>New Password</strong>
												</h3>
												<input
													type="password"
													placeholder="Enter New Password"
													id="new_password"
													{...register("new_password", { required: true })}
													className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline-blue ${
														errors.new_password
															? "border-red-500 focus:border-red-500"
															: ""
													}`}
												/>
												{errors.new_password && (
													<span className="text-red-600 dark:text-red-400 mb-2 block">
														This field is required
													</span>
												)}
												<h3>
													<strong>Confirm Password</strong>
												</h3>
												<input
													type="password"
													placeholder="Enter Confirm Password"
													id="confirm_password"
													{...register("confirm_password", { required: true })}
													className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline-blue ${
														errors.confirm_password
															? "border-red-500 focus:border-red-500"
															: ""
													}`}
												/>
												{errors.confirm_password && (
													<span className="text-red-600 dark:text-red-400 mb-2 block">
														This field is required
													</span>
												)}

												<div>
													<button
														type="button"
														onClick={closeModal}
														className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
													>
														Close
													</button>
													<button
														type="submit"
														className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
													>
														Save Changes
													</button>
												</div>
											</form>
										)}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

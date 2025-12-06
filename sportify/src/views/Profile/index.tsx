import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../utls/constants";
import { SubmitHandler, useForm } from "react-hook-form";

export const Profile: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);

	const navigate = useNavigate();
	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};

	type Preferences = {};

	interface Payload {
		id: number;
		name: string;
		email: string;
		preferences: Preferences;
	}

	const [user, setUser] = useState<Payload>({} as Payload);
	const fetchDetails = async () => {
		try {
			const token = localStorage.getItem("authToken");
			const response = await fetch(`${API_ENDPOINT}/user`, {
				method: "GET",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch user details!");
			}
			const data = await response.json();
			setUser(data);
		} catch (error) {
			console.error(error);
		}
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Payload>();

	useEffect(() => {
		fetchDetails();
		reset({
			name: user.name,
			email: user.email,
		});
	}, [user]);

	const onSubmit: SubmitHandler<Payload> = async (data: Payload) => {
		console.log(data);
		closeModal();
	};
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
										User Details
									</Dialog.Title>

									<div className="mt-2">
										<form onSubmit={handleSubmit(onSubmit)}>
											<h3>
												<strong>Name</strong>
											</h3>
											<input
												type="text"
												placeholder="Enter Name"
												id="title"
												{...register("name", { required: true })}
												className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
													errors.name
														? "border-red-500 focus:border-red-500"
														: ""
												}`}
											/>
											{errors.name && (
												<span className="text-red-600 dark:text-red-400 mb-2 block">
													This field is required
												</span>
											)}
											<h3>
												<strong>Email</strong>
											</h3>
											<input
												type="text"
												placeholder="Enter Name"
												id="description"
												{...register("email")}
												className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
													errors.email
														? "border-red-500 focus:border-red-500"
														: ""
												}`}
											/>
											{errors.email && (
												<span className="text-red-600 dark:text-red-400 mb-2 block">
													Invalid Email
												</span>
											)}
										</form>
										<div>
											<button
												type="submit"
												onClick={closeModal}
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											>
												Close
											</button>
										</div>
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

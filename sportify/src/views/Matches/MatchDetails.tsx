import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useContext, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MatchDetailsPayload } from "../../contexts/Matches/types";
import { ThemeContext } from "../../contexts/Theme/ThemeContext";

export const MatchDetails: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);
	const { theme } = useContext(ThemeContext);

	const navigate = useNavigate();
	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};
	useParams();
	const location = useLocation();
	const matchFromState = (location.state as { match?: MatchDetailsPayload })
		?.match;

	const [match] = useState<MatchDetailsPayload>(
		matchFromState || ({} as MatchDetailsPayload)
	);
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className={`relative z-10 ${theme === "dark" ? "dark" : ""}`}
					onClose={closeModal}
				>
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
								<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 dark:text-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2"
									>
										{match?.isRunning && (
											<span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
												● Live
											</span>
										)}
										<span>Match Details</span>
									</Dialog.Title>

									<div className="mt-4 overflow-y-auto max-h-[85vh] space-y-4">
										<div className="space-y-2">
											<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
												Match Information
											</h4>
											<div className="space-y-1 text-sm">
												<div className="flex items-center gap-2">
													<span className="font-semibold text-gray-600 dark:text-gray-400">
														Name:
													</span>
													<span>{match?.name}</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="font-semibold text-gray-600 dark:text-gray-400">
														Sport:
													</span>
													<span>{match?.sportName}</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="font-semibold text-gray-600 dark:text-gray-400">
														Location:
													</span>
													<span>{match?.location}</span>
												</div>
											</div>
										</div>

										<div className="space-y-2">
											<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
												Schedule
											</h4>
											<div className="space-y-1 text-sm">
												<div className="flex items-center gap-2">
													<span className="font-semibold text-gray-600 dark:text-gray-400">
														Starts:
													</span>
													<span>
														{new Date(match?.startsAt).toLocaleDateString()}{" "}
														{new Date(match?.startsAt).toLocaleTimeString()}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="font-semibold text-gray-600 dark:text-gray-400">
														Ends:
													</span>
													<span>
														{new Date(match?.endsAt).toLocaleDateString()}{" "}
														{new Date(match?.endsAt).toLocaleTimeString()}
													</span>
												</div>
											</div>
										</div>

										{match?.story && (
											<div className="space-y-2">
												<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
													Story
												</h4>
												<p className="text-sm leading-relaxed">
													{match?.story}
												</p>
											</div>
										)}

										<div className="space-y-2">
											<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
												Teams & Scores
											</h4>
											<ul className="space-y-2">
												{match?.teams?.map((team) => (
													<li
														key={team.id}
														className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
													>
														<span className="font-medium">{team.name}</span>
														<span className="text-lg font-bold text-gray-900 dark:text-white">
															{match?.score[team.name] || "0"}
														</span>
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className="pt-4 border-t dark:border-gray-700">
										<button
											type="submit"
											onClick={closeModal}
											className="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
										>
											Close
										</button>
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

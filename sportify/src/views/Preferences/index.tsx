import { useState, useEffect, Fragment, useContext } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { listSports } from "../../contexts/Sports/actions";
import { Sport } from "../../contexts/Sports/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Team } from "../../contexts/Teams/types";
import { listTeams } from "../../contexts/Teams/actions";
import {
	getUserPreferences,
	updateUserPreferences,
} from "../../contexts/Preferences/actions";
import {
	usePreferencesDispatch,
	usePreferencesState,
} from "../../contexts/Preferences/context";
import { ThemeContext } from "@/contexts/Theme/ThemeContext";

export const Preferences: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [preferences, setPreferences] = useState<any>(null);
	const [sports, setSports] = useState<Sport[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const { theme } = useContext(ThemeContext);

	const obtainSports = async () => {
		const sportsData = await listSports();
		setSports(sportsData);
	};
	const obtainTeams = async () => {
		const teamsData = await listTeams();
		setTeams(teamsData);
	};

	const preferencesState = usePreferencesState();
	const preferencesDispatch = usePreferencesDispatch();
	const navigate = useNavigate();
	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};
	const { register, handleSubmit } = useForm<Payload>();
	interface Payload {
		teams: number[];
		sports: number[];
	}
	const onSubmit: SubmitHandler<Payload> = async (data) => {
		const teams = Object.entries(data.teams)
			.filter(([_, value]) => value)
			.map(([key, _]) => Number(key));
		const sports = Object.entries(data.sports)
			.filter(([_, value]) => value)
			.map(([key, _]) => Number(key));
		const preferencesPayload = { teams, sports };
		updateUserPreferences(preferencesDispatch, preferencesPayload);
		alert("Preferences updated successfully");
		closeModal();
	};
	useEffect(() => {
		setPreferences(preferencesState?.preferences);
		obtainSports();
		obtainTeams();
	}, []);

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
										className="text-2xl font-bold leading-6 text-gray-900 dark:text-white"
									>
										Preferences
									</Dialog.Title>

									<div>
										<form
											onSubmit={handleSubmit(onSubmit)}
											className="mt-4 flex flex-col gap-6 max-h-[75vh] overflow-y-auto"
										>
											<div className="space-y-3">
												<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
													Favourite Sports
												</h3>
												<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
													{sports.map((sport) => (
														<label
															key={sport.id}
															className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
														>
															<input
																type="checkbox"
																defaultChecked={preferences?.sports?.includes(
																	sport.id
																)}
																{...register(`sports.${sport.id}`)}
																className="w-4 h-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-400"
															/>
															<span className="text-sm">{sport.name}</span>
														</label>
													))}
												</div>
											</div>

											<div className="space-y-3">
												<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
													Favourite Teams
												</h3>
												<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
													{teams.map((team) => (
														<label
															key={team.id}
															className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
														>
															<input
																type="checkbox"
																defaultChecked={preferences?.teams?.includes(
																	team.id
																)}
																{...register(`teams.${team.id}`)}
																className="w-4 h-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-400"
															/>
															<span className="text-sm">{team.name}</span>
														</label>
													))}
												</div>
											</div>

											<div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
												<button
													type="button"
													onClick={closeModal}
													className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
												>
													Cancel
												</button>
												<button
													type="submit"
													className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
												>
													Save
												</button>
											</div>
										</form>
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

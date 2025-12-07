import { useState, useEffect, Fragment } from "react";
import { API_ENDPOINT } from "../../utls/constants";
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

export const Preferences: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [preferences, setPreferences] = useState<any>(null);
	const [sports, setSports] = useState<Sport[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);

	const obtainSports = async () => {
		const sportsData = await listSports();
		setSports(sportsData);
	};
	const obtainTeams = async () => {
		const teamsData = await listTeams();
		setTeams(teamsData);
	};

	const obtainPreferences = async () => {
		const data = await getUserPreferences();
		setPreferences(data);
	};
	const navigate = useNavigate();
	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Payload>();
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
		updateUserPreferences(preferencesPayload);
		alert("Preferences updated successfully");
		closeModal();
	};
	useEffect(() => {
		obtainPreferences();
		obtainSports();
		obtainTeams();
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
										className="text-4xl font-medium leading-6 text-gray-900"
									>
										Your Preferences
									</Dialog.Title>

									<div className="mt-2">
										<form onSubmit={handleSubmit(onSubmit)}>
											<h3 className="text-2xl mb-2 mt-4">
												<strong>Favourite Sports</strong>
											</h3>
											{sports.map((sport) => (
												<div key={sport.id} className="flex flex-wrap mb-2">
													<label className="flex items-center">
														<input
															type="checkbox"
															defaultChecked={preferences?.sports?.includes(
																sport.id
															)}
															{...register(`sports.${sport.id}`)}
															className="mr-2"
														/>
														<span>{sport.name}</span>
													</label>
												</div>
											))}
											<h3 className="text-2xl mb-2 mt-4">
												<strong>Favourite Teams</strong>
											</h3>
											{teams.map((team) => (
												<div key={team.id} className="flex flex-wrap mb-2">
													<label className="flex items-center">
														<input
															type="checkbox"
															defaultChecked={preferences?.teams?.includes(
																team.id
															)}
															{...register(`teams.${team.id}`)}
															className="mr-2"
														/>
														<span>{team.name}</span>
													</label>
												</div>
											))}
											<div>
												<button
													type="button"
													onClick={closeModal}
													className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												>
													Close
												</button>
												<button
													type="submit"
													className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
												>
													Save Changes
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

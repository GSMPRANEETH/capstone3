import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../utls/constants";
import { MatchesPayload } from "../../utls/Matches/types";
import { showMatch } from "../../contexts/Matches/actions";

export const MatchDetails: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);

	const navigate = useNavigate();
	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};
	const { matchID } = useParams();
	type MatchDetails = MatchesPayload & {
		score: Record<string, string>;
		startsAt: string;
		playingTeam: number;
		story: string;
	};

	const [match, setMatch] = useState<MatchDetails>({} as MatchDetails);

	const obtainDetails = async () => {
		const details = await showMatch(matchID ?? "");
		setMatch(details);
	};

	useEffect(() => {
		obtainDetails();
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
										Match details
									</Dialog.Title>

									<div className="mt-2">
										<p>Name: {match?.name}</p>
										<p>Sport: {match?.sportName}</p>
										<p>Started: {match?.startsAt}</p>
										<p>Ends: {match?.endsAt}</p>
										{match?.isRunning && <p>Live</p>}
										<p>Story: {match?.story}</p>
										<p>Teams:</p>
										<ul className="list-disc list-inside ml-4">
											{match?.teams?.map((team) => (
												<li key={team.id}>
													{team.name} : {match?.score[team.name]}
												</li>
											))}
										</ul>
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

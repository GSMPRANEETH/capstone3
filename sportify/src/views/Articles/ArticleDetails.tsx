import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../utls/constants";
import { ArticlesPayload } from "../../utls/Articles/types";
import { showArticle } from "../../contexts/Articles/actions";

export const ArticleDetails: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);

	const navigate = useNavigate();
	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};
	const { articleID } = useParams();
	type ArticleWithContent = ArticlesPayload & { content: string };

	const [article, setArticle] = useState<ArticleWithContent>(
		{} as ArticleWithContent
	);

	const obtainDetails = async () => {
		const details = await showArticle(articleID ?? "");
		setArticle(details);
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
										Article details
									</Dialog.Title>

									<div className="mt-2">
										<p>Title: {article?.title}</p>
										<p>Sport: {article?.sport?.name}</p>
										<p>Date: {article?.date}</p>
										<p>Summary: {article?.summary}</p>
										<p>Content: {article?.content}</p>
										<img src={article?.thumbnail} alt={article?.title} />
										<p>Teams:</p>
										<ul className="list-disc list-inside ml-4">
											{article?.teams?.map((team) => (
												<li key={team.id}>{team.name}</li>
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

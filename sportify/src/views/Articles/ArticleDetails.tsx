import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../utls/constants";
import { ArticlesPayload } from "../../utls/Articles/types";

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
	const fetchDetails = async () => {
		const id = articleID;
		try {
			const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
				method: "GET",
				headers: { "Content-type": "application/json" },
			});

			if (!response.ok) {
				throw new Error("Sign-in failed!");
			}
			const data = await response.json();
			setArticle(data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchDetails();
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
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Article details
									</Dialog.Title>
									<p>Title: {article?.title}</p>
									<p>Sport: {article?.sport?.name}</p>
									<p>Date: {article?.date}</p>
									<p>Summary: {article?.summary}</p>
									<p>Content: {article?.content}</p>
									<img src={article?.thumbnail} alt={article?.title} />
									<p>Teams:</p>
									{article?.teams?.map((team) => (
										<p>{team.name}</p>
									))}
									<div className="mt-2">
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

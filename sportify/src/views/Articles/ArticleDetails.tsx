import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../utls/constants";
import {
	ArticlesPayload,
	ArticleWithContent,
} from "../../contexts/Articles/types";
import { showArticle } from "../../contexts/Articles/actions";
import { ThemeContext } from "../../contexts/Theme/ThemeContext";

export const ArticleDetails: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);
	const { theme } = useContext(ThemeContext);

	const navigate = useNavigate();
	const closeModal = () => {
		setIsOpen(false);
		navigate("../");
	};
	const { articleID } = useParams();

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
										className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
									>
										{article?.title}
									</Dialog.Title>

									<div className="mt-4 overflow-y-auto max-h-[85vh] space-y-4">
										<img
											className="w-full h-60 object-cover rounded-lg"
											src={article?.thumbnail}
											alt={article?.title}
										/>

										<div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
											<div className="flex items-center gap-2">
												<span className="font-semibold">Sport:</span>
												<span>{article?.sport?.name}</span>
											</div>
											<div className="flex items-center gap-2">
												<span className="font-semibold">Date:</span>
												<span>
													{new Date(article?.date).toLocaleDateString()}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<span className="font-semibold">Time:</span>
												<span>
													{new Date(article?.date).toLocaleTimeString()}
												</span>
											</div>
										</div>

										<div className="space-y-2">
											<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
												Summary
											</h4>
											<p className="text-sm leading-relaxed">
												{article?.summary}
											</p>
										</div>

										<div className="space-y-2">
											<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
												Content
											</h4>
											<p className="text-sm leading-relaxed">
												{article?.content}
											</p>
										</div>

										{article?.teams && article.teams.length > 0 && (
											<div className="space-y-2">
												<h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
													Teams
												</h4>
												<ul className="list-disc list-inside ml-4 space-y-1 text-sm">
													{article?.teams?.map((team) => (
														<li key={team.id}>{team.name}</li>
													))}
												</ul>
											</div>
										)}
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

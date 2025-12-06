import {
	Disclosure,
	DisclosureButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Switch,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/Theme/ThemeContext";

export default function Example() {
	const isAuth = !!localStorage.getItem("authToken");
	const navigate = useNavigate();
	const { theme, setTheme } = useContext(ThemeContext);
	const [enabled, setEnabled] = useState(theme === "light" ? false : true);

	const toggleTheme = () => {
		setEnabled(!enabled);
		setTheme(enabled ? "light" : "dark");
	};
	return (
		<Disclosure
			as="nav"
			className="relative bg-gray-800 dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
		>
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						{/* Mobile menu button*/}
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								aria-hidden="true"
								className="block size-6 group-data-open:hidden"
							/>
							<XMarkIcon
								aria-hidden="true"
								className="hidden size-6 group-data-open:block"
							/>
						</DisclosureButton>
					</div>
					<Link to="/" className="flex flex-1 justify-center sm:items-stretch">
						<div className="flex shrink-0 items-center">
							<p className="text-5xl font-semibold">Sportify</p>
						</div>
					</Link>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<Switch
							checked={enabled}
							onChange={toggleTheme}
							className={`${enabled ? "bg-slate-500" : "bg-slate-200"}
              relative inline-flex h-[24px] w-[100px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 mr-4`}
						>
							<span
								aria-hidden="true"
								className={`${enabled ? "translate-x-20" : "translate-x-0"}
                pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
						{isAuth && (
							<Disclosure.Button
								type="button"
								className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								onClick={() => {
									navigate("/preferences");
								}}
							>
								<span className="absolute -inset-1.5" />
								<span className="sr-only">Set Preferences</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="size-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									/>
								</svg>
							</Disclosure.Button>
						)}

						{/* Profile dropdown */}
						<Menu as="div" className="relative ml-3">
							<MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
								<span className="absolute -inset-1.5" />
								<span className="sr-only">Open user menu</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="size-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									/>
								</svg>
							</MenuButton>

							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
							>
								{isAuth && (
									<MenuItem>
										<a
											href="/user"
											className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
										>
											Profile
										</a>
									</MenuItem>
								)}
								<MenuItem>
									{isAuth ? (
										<a
											href="/signout"
											className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
										>
											Sign out
										</a>
									) : (
										<a
											href="/signin"
											className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
										>
											Sign In
										</a>
									)}
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
				</div>
			</div>
		</Disclosure>
	);
}

import React, { useState } from "react";
import heroImage from "../images/img2.jpg";

const Header = () => {
	let languages: string[] = ["en", "de", "se"];
	const [chevronDown, setChevron] = useState<boolean>(true);
	const [language, setLanguage] = useState<string>("en");
	const [isSidebarOpened, setSidebarOpened] = useState<boolean>(false);
	let filterLan = languages.filter((lan) => lan !== language);
	console.log(languages);
	return (
		<header
			className="bg-cover h-96"
			style={{
				backgroundImage: `linear-gradient( 
        0deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ),url(${heroImage})`,
			}}
		>
			<nav className="flex items-center justify-between lg:justify-around text-white py-8 px-8 lg:px-0">
				<div className="flex">
					<div className="lg:hidden mr-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							onClick={() => {
								setSidebarOpened(true);
							}}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</div>
					<span className="uppercase cursor-pointer  text-base ">cosi</span>
				</div>
				<div className="hidden lg:block">
					<ul className="flex space-x-6">
						<li className="cursor-pointer hover:text-gray-300">Locations</li>
						<li className="cursor-pointer hover:text-gray-300">Our story</li>
						<li className="cursor-pointer hover:text-gray-300">Real estate</li>
						<li className="cursor-pointer hover:text-gray-300">
							Extended stay
						</li>
						<li className="cursor-pointer hover:text-gray-300">Careers</li>
					</ul>
				</div>

				<div className="relative bg-gray-500 bg-opacity-10 ">
					<button
						className="flex items-center space-x-1 cursor-pointer px-4 py-2 focus:outline-none"
						type="button"
						onClick={() => {
							setChevron(!chevronDown);
						}}
					>
						<span className="uppercase">{language}</span>
						{chevronDown ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						)}
					</button>
					{chevronDown ? null : (
						<div className="bg-white absolute top-10 left-0">
							<ul className="text-black uppercase">
								{filterLan.map((lan: string, index: number) => (
									<li
										key={index}
										className="px-5 py-2 cursor-pointer"
										onClick={() => {
											setLanguage(lan);
										}}
									>
										{lan}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</nav>
			{/* side mobile menu bar */}
			{isSidebarOpened ? (
				<aside className="bg-gray-500 fixed transform  top-0 left-0 w-56 h-full  overflow-auto ease-in-out transition-all duration-300 z-30">
					<div className="w-full h-full px-3 translate-x-0">
						<div className="flex justify-between items-center pt-4 pb-10  ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8 text-white"
								onClick={() => {
									setSidebarOpened(false);
								}}
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
							<span className="uppercase text-white text-2xl">cosi</span>
						</div>
						{/* about section */}
						<div>
							<p className="text-gray-200">About us</p>
							<ul className="text-white mt-4 space-y-2 ">
								<li>Our Story</li>
								<li>Real Estate Partners</li>
								<li>Careers</li>
								<li>Press</li>
								<li>Extended Stay</li>
								<li>Group Travel</li>
							</ul>
						</div>
						{/* about section */}
						{/* locations section */}
						<div className="mt-6">
							<p className="text-gray-200">Locatios</p>
							<ul className="text-white mt-4 space-y-2 ">
								<li>Berlin</li>
								<li>Frankfurt</li>
								<li>Leipzing</li>
								<li>Munich</li>
								<li>Hamburg</li>
								<li>Vienna</li>
								<li>Barcelona</li>
								<li>Madrid</li>
							</ul>
						</div>
						{/* locations section */}
						{/* support*/}
						<div className="mt-6 pb-3">
							<p className="text-gray-200">Support</p>
							<ul className="text-white mt-4 space-y-2 text-sm ">
								<li>we are happy to help</li>
								<li>+493031196117</li>
								<li>info@cosi-group.com</li>
							</ul>
						</div>
						{/* support*/}
					</div>
				</aside>
			) : (
				<aside className="bg-gray-500 fixed transform -translate-x-full top-0 left-0 w-56 h-full  overflow-auto ease-in-out transition-all duration-300 z-30">
					<div className="w-full h-full px-3 ">
						<div className="flex justify-between items-center pt-4 pb-10  ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8 text-white"
								onClick={() => {
									setSidebarOpened(false);
								}}
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
							<span className="uppercase text-white text-2xl">cosi</span>
						</div>
						{/* about section */}
						<div>
							<p className="text-gray-200">About us</p>
							<ul className="text-white mt-4 space-y-2 ">
								<li>Our Story</li>
								<li>Real Estate Partners</li>
								<li>Careers</li>
								<li>Press</li>
								<li>Extended Stay</li>
								<li>Group Travel</li>
							</ul>
						</div>
						{/* about section */}
						{/* locations section */}
						<div className="mt-6">
							<p className="text-gray-200">Locatios</p>
							<ul className="text-white mt-4 space-y-2 ">
								<li>Berlin</li>
								<li>Frankfurt</li>
								<li>Leipzing</li>
								<li>Munich</li>
								<li>Hamburg</li>
								<li>Vienna</li>
								<li>Barcelona</li>
								<li>Madrid</li>
							</ul>
						</div>
						{/* locations section */}
						{/* support*/}
						<div className="mt-6 pb-3">
							<p className="text-gray-200">Support</p>
							<ul className="text-white mt-4 space-y-2 text-sm ">
								<li>we are happy to help</li>
								<li>+493031196117</li>
								<li>info@cosi-group.com</li>
							</ul>
						</div>
						{/* support*/}
					</div>
				</aside>
			)}
			{/* side mobile menu bar */}

			{/* header title */}
			<div className=" max-w-md mx-auto text-center text-4xl font-bold text-white">
				<h1>Changing the way our guests feel about travel</h1>
			</div>
			{/* header title */}

			{/* search section */}

			<div className="bg-white max-w-4xl mt-12  mx-auto flex text-black rounded ">
				<div className="w-3/5 flex py-2">
					<div className="flex items-center w-1/2  justify-center cursor-pointer border-r border-gray-500 ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<div>
							<p className="text-md leading-4">Location</p>
							<p className="text-lg leading-8">Where are you doing?</p>
						</div>
					</div>
					<div className="flex items-center w-1/2  justify-center cursor-pointer border-r border-gray-500 ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<div>
							<p className="text-md leading-4">Location</p>
							<p className="text-lg leading-8">Where are you doing?</p>
						</div>
					</div>
				</div>
				<div className="flex items-center w-2/5 justify-between  cursor-pointer pl-3 pr-1">
					<div className="flex items-center py-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<div>
							<p className="text-md leading-4">Location</p>
							<p className="text-lg leading-8">Where are you doing?</p>
						</div>
					</div>
					<div className="py-1  h-full ">
						<button
							type="button"
							className="flex items-center space-x-2 px-3  h-full bg-primary text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Search</span>
						</button>
					</div>
				</div>
			</div>

			{/* search section */}
		</header>
	);
};
export default Header;

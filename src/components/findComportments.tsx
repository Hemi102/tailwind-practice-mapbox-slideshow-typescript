import React, { useEffect, useState } from "react";

import { render } from "react-dom";
import { InView } from "react-intersection-observer";

import ReactMapGL, {
	FlyToInterpolator,
	WebMercatorViewport,
	MapContext,
	Marker,
} from "react-map-gl";

import VisibleView from "../utility/visibleView";
import ScrollWrapper from "../elements/ScrollWrapper";
import IsDisplayed from "../elements/IsDisplayed";

import data from "../data/location.json";
// 3rd-party easing functions
import { easeCubic } from "d3-ease";

import img1 from "../images/room1.jpg";
import img2 from "../images/room2.jpg";
import img3 from "../images/img2.jpg";

import SlideShow from "../utility/slideShow";

const FindComportments = () => {
	let languages: string[] = ["en", "de", "se"];
	const [chevronDown, setChevron] = useState<boolean>(true);
	const [language, setLanguage] = useState<string>("en");
	const [isSidebarOpened, setSidebarOpened] = useState<boolean>(false);
	const [isScrolled, setScrolled] = useState<boolean>(false);
	const [viewport, setViewport] = useState({
		latitude: 27.2046,
		longitude: 77.4977,
		width: "100%",
		height: "100%",
		zoom: 13,
	});

	let filterLan = languages.filter((lan) => lan !== language);
	let currentIndex = 0;

	const listenScrollEvent = (e) => {
		if (window.scrollY > 10) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	const goToNYC = () => {
		setViewport({
			...viewport,
			longitude: -74.1,
			latitude: 40.7,
			zoom: 14,
			transitionDuration: 1000,
			transitionInterpolator: new FlyToInterpolator(),
			transitionEasing: easeCubic,
		});
	};

	const goToSF = () => {
		const { longitude, latitude, zoom } = new WebMercatorViewport(
			viewport
		).fitBounds(
			[
				[-122.4, 37.7],
				[-122.5, 37.8],
			],
			{
				padding: 20,
				offset: [0, -100],
			}
		);
		setViewport({
			...viewport,
			longitude,
			latitude,
			zoom,
			transitionDuration: 2000,
			transitionInterpolator: new FlyToInterpolator(),
			transitionEasing: easeCubic,
		});
	};

	function CustomMarker(props) {
		const context = React.useContext(MapContext);

		const { longitude, latitude } = props;

		const [x, y] = context.viewport.project([longitude, latitude]);

		const markerStyle = {
			position: "absolute",
			background: "#fff",
			left: x,
			top: y,
		};

		return (
			<button
				type="button"
				className="p-1 w-20 h-28 bg-white space-y-2 focus:outline-none "
				style={markerStyle}
			>
				<div className="w-full h-16">
					<img src={img1} className="h-full w-full object-cover" />
				</div>
				<p className="text-center">Munico</p>
				<div className="bottomMark"></div>
			</button>
		);
	}

	useEffect(() => {
		window.addEventListener("scroll", listenScrollEvent);

		return () => window.removeEventListener("scroll", listenScrollEvent);
	}, []);
	const images = [img1, img2, img3];
	return (
		<section className="findComportments">
			{/* header main section */}
			<nav
				className={
					"flex items-center mb-1 align-middle justify-between  text-black py-4 lg:px-8 px-4 " +
					(isScrolled ? "" : "shadow-md")
				}
			>
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
					<ul className="flex space-x-7 tracking-wide">
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
				<aside className="bg-gray-500 fixed transform  top-0 left-0 w-56 h-full  overflow-auto ease-in-out transition-all duration-300">
					<div className="w-full h-full px-3 translate-x-0">
						<div className="flex justify-between items-center pt-4 pb-10  ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8 text-black"
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
							<span className="uppercase text-black text-2xl">cosi</span>
						</div>
						{/* about section */}
						<div>
							<p className="text-gray-200">About us</p>
							<ul className="text-black mt-4 space-y-2 ">
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
				<aside className="bg-gray-500 fixed transform -translate-x-full top-0 left-0 w-56 h-full  overflow-auto ease-in-out transition-all duration-300 z-10">
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

			{/* header main section */}

			<div
				className={
					"sticky w-full bg-white top-0  flex  lg:justify-between justify-around text-black py-4 lg:px-8 px-0 items-center z-10 " +
					(isScrolled ? "shadow-md " : "")
				}
			>
				<div
					className={
						"  bg-white transtion-all transition-200 hidden lg:block " +
						(isScrolled ? "opacity-100" : "opacity-0")
					}
				>
					<span className="uppercase cursor-pointer  text-base ">cosi</span>
				</div>
				<div className="lg:flex-none flex-1 lg:px-0 px-4   ">
					<div className=" bg-white border border-gray-300 align-middle hidden lg:flex ">
						<div className=" py-3 ">
							<p className=" border-r pr-12 lg:ml-6">Munich</p>
						</div>
						<div className="  py-3 ">
							<p className="border-r pr-12 ml-12">Jun 01 - June 02</p>
						</div>
						<div className=" flex ">
							<div className="py-3">
								<p className="pr-12  ml-6">1 gest</p>
							</div>
							<div className="py-1 mr-1  h-full ">
								<button
									type="button"
									className=" px-3  h-full bg-primary text-white rounded"
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
								</button>
							</div>
						</div>
					</div>
					<div className="flex items-center lg:hidden justify-between border pl-6 pr-1 ">
						<div className="py-3">
							<p>Munich</p>
						</div>
						<hr className=" h-full w-1 py-3 border-r" />

						<div className="  py-3 ">
							<p className="">Jun 01 - June 02</p>
						</div>
						<hr className=" h-full w-1 py-3 border-r" />
						<div className="py-3">
							<p className="">1 gest</p>
						</div>

						<button
							type="button"
							className=" px-3 py-2 rounded  bg-primary text-white"
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
						</button>
					</div>
				</div>
				<div
					className={
						"relative bg-gray-500 bg-opacity-10 transition-all transition-200 hidden lg:block " +
						(isScrolled ? "opacity-100" : "opacity-0")
					}
				>
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
			</div>
			<div className="lg:flex">
				<div className="flex-shrink-0 w-102 pl-32 pr-12">
					{data.Location.map((place, index) => {
						currentIndex = index;

						return (
							<VisibleView
								viewport={viewport}
								setLocation={setViewport}
								location={place}
								key={index}
							>
								<div className="mt-10">
									<div>
										<span>1 Guest</span>
										<span>,</span>
										<span>1 Night</span>
										<span>,</span>
										<span>June 01 - June 02</span>
									</div>
									<div className="space-x-4 mt-2 mb-4 ">
										<span className="text-4xl font-bold">Munich</span>
										<span>2 Available room types</span>
									</div>
									<div className="relative w-full h-101 overflow-hidden ">
										<SlideShow images={images} />
									</div>
								</div>
							</VisibleView>
						);
					})}
					{/* <div>
						<div>
							<span>1 Guest</span>
							<span>,</span>
							<span>1 Night</span>
							<span>,</span>
							<span>June 01 - June 02</span>
						</div>
						<div className="space-x-4 mt-2 mb-4 ">
							<span className="text-4xl font-bold">Munich</span>
							<span>2 Available room types</span>
						</div>
						<div className="relative w-full h-101 overflow-hidden ">
							<SlideShow images={images} />
						</div>
					</div>
					<div>
						<div>
							<span>1 Guest</span>
							<span>,</span>
							<span>1 Night</span>
							<span>,</span>
							<span>June 01 - June 02</span>
						</div>
						<div className="space-x-4 mt-2 mb-4 ">
							<span className="text-4xl font-bold">Munich</span>
							<span>2 Available room types</span>
						</div>
						<div className="relative w-full h-101 overflow-hidden ">
							<SlideShow images={images} />
						</div>
					</div>
					<div>
						<div>
							<span>1 Guest</span>
							<span>,</span>
							<span>1 Night</span>
							<span>,</span>
							<span>June 01 - June 02</span>
						</div>
						<div className="space-x-4 mt-2 mb-4 ">
							<span className="text-4xl font-bold">Munich</span>
							<span>2 Available room types</span>
						</div>
						<div className="relative w-full h-101 overflow-hidden ">
							<SlideShow images={images} />
						</div>
					</div> */}
				</div>
				<div className="map flex-1">
					<ReactMapGL
						{...viewport}
						mapboxApiAccessToken={
							"pk.eyJ1IjoiaGFtemEtaXJmYW4iLCJhIjoiY2twZDYzaDBvMWt0cTJ1cDdxNXo2OTN1dCJ9.OpgFeDJxMsqmwoo_1-ce9A"
						}
						onViewportChange={(viewport) => {
							setViewport(viewport);
						}}
					>
						{data.Location.map((place,index)=> (
							<Marker
							longitude={place.Longitude}
							latitude={place.Latitude}
							offsetLeft={-20}
							offsetTop={-10}
							key={index}
						>
							<button
								type="button"
								className="p-1 w-20 h-28 bg-white space-y-2 focus:outline-none "
							>
								<div className="w-full h-16">
									<img src={img1} className="h-full w-full object-cover" />
								</div>
								<p className="text-center">Munico</p>
								<div className="bottomMark"></div>
							</button>
						</Marker>
						))}
						{/* <CustomMarker
							longitude={viewport.longitude}
							latitude={viewport.latitude}
						/> */}
						{/* <button onClick={goToSF}>New York City</button> */}
					</ReactMapGL>
				</div>
			</div>
		</section>
	);
};
export default FindComportments;

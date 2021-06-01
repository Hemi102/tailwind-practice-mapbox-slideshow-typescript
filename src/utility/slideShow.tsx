import React, { useState } from "react";

const SlideShow = ({ images }): any => {
	const [currentImage, setCurrentImage] = useState<any>(images[0]);
	const [nextImage, setNextImage] = useState<any>(images[0]);

	const setNext = () => {
		let index = images.indexOf(currentImage);
    console.log(((1 + 1 + 4) % 4));
    
		setCurrentImage(images[((index + 1 + images.length) % images.length)]);
		
	};
	const setPrevious = () => {
		let index = images.indexOf(currentImage);
		setCurrentImage(images[(index - 1 + images.length) % images.length]);
	};
	return (
		<div className="">
			{images.map((image, index) => {
        let imageIndex: number = images.indexOf(currentImage);
				console.log("image index", imageIndex);
				return (
					<div
						className={
							"absolute w-full h-full  text-black flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform  translate-x-0 " +
							((index < imageIndex)
								? "-translate-x-full"
								: index > imageIndex
								? "translate-x-full"
								: "translate-x-0")
						}
					>
						<img src={image} className="h-full w-full object-cover"/>
					</div>
				);
			})}

			<div
				className="absolute right-0 top-40 bg-black w-10 h-10 mr-3 rounded-full flex items-center justify-center bg-opacity-8 text-white cursor-pointer"
				onClick={() => {
					setNext();
				}}
			>
				&#x276F;
			</div>
			<div
				className="absolute left-0 top-40 bg-black w-10 h-10 ml-3 rounded-full flex items-center justify-center bg-opacity-8 text-white cursor-pointer"
				onClick={() => {
					setPrevious();
				}}
			>
				&#x276E;
			</div>
		</div>
	);
};
export default SlideShow;

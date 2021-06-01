import React from 'react'
import { InView } from "react-intersection-observer";
import { easeCubic } from "d3-ease";
import ReactMapGL, {
	FlyToInterpolator,
	
} from "react-map-gl";

const VisibleView = ({viewport, setLocation, location ,children}) => {
	
	return (
		<InView
			as="div"
			onChange={(inView, entry) => {inView ? setLocation({
				...viewport,
				longitude:location.Longitude,
				latitude:location.Latitude,
				zoom:14,
				transitionDuration: 2000,
				transitionInterpolator: new FlyToInterpolator(),
				transitionEasing: easeCubic,
			}) :console.log(inView)}}
			threshold={1}
		>
		{children}
		</InView>
	);
};

export default VisibleView;

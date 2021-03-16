import React from "react";
import ConversionForm from "../Components/ConversionForm";
import InfoSection from "../Components/InfoSection";

function AppleMusicToSpotify(props) {
	return (
		<div>
			Apple music to spotify conversion goes here.
			<ConversionForm query={props.query} />
			<hr />
			<InfoSection />
		</div>
	);
}

export default AppleMusicToSpotify;

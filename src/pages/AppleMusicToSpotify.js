import React from "react";
import ConversionForm from "../Components/ConversionForm";

function AppleMusicToSpotify(props) {
	return (
		<div>
			<ConversionForm query={props.query} />
		</div>
	);
}

export default AppleMusicToSpotify;

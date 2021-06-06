import React from "react";
import PropTypes from "prop-types";
import ConversionForm from "../Components/ConversionForm";

function AppleMusicToSpotify(props) {
	return (
		<div>
			<ConversionForm query={props.query} />
		</div>
	);
}

AppleMusicToSpotify.propTypes = {
	query: PropTypes.string,
};

export default AppleMusicToSpotify;

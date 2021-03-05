import React from "react";
import InfoSection from "./InfoSection";
import ConversionForm from "./ConversionForm";
import "./Loggedin.css";

//TODO implement global state management. Redux? Context?
const Loggedin = (props) => {
	return (
		<div>
			{/* TODO:Fix this prop drilling. */}
			<ConversionForm props={props} />
			<InfoSection />
		</div>
	);
};

export default Loggedin;

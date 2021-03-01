import React from "react";
import InfoSection from "./InfoSection";
import ConversionForm from "./ConversionForm";
import "./Loggedin.css";

//TODO implement global state management. Redux? Context?
const Loggedin = (props) => {
	return (
		<div>
			<ConversionForm />
			<InfoSection />
		</div>
	);
};

export default Loggedin;

import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import AppleMusicToSpotify from "./AppleMusicToSpotify";
import Login from "./Login";
import { conversionTypes } from "../Utils/utils";
import { login } from "../redux/reducers/user-actions";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
	mainContainer:{
		textAlign: "center"
	}
});

function Convert(props) {
	const classes = useStyles();
	const location = useLocation();
	const dispacth = useDispatch();
	const searchQuery = location.search;
	const [conversionType, setConversionType] = useState("");

	const handleConversionSelection = (convType) => {
		setConversionType(convType);
	};

	const getConversionComponent = () => {
		if (conversionType === conversionTypes.APPLE_MUSIC_TO_SPOTIFY) {
			return <AppleMusicToSpotify query={searchQuery} />;
		}
	};

	const checkSpotifyLogin = () => {
		if (props.spotifyLogin) {
			return (
				<>
					<button
						onClick={() => {
							handleConversionSelection(conversionTypes.APPLE_MUSIC_TO_SPOTIFY);
						}}
					>
						Apple Music to Spotify
					</button>
					{getConversionComponent()}
				</>
			);
		}
		return <Login />;
	};

	useEffect(() => {
		if (searchQuery) {
			dispacth(login());
		}
	});
	
	return (
		<div className={classes.mainContainer}>
			<h2>Main conversion page is here.</h2>
			{checkSpotifyLogin()}
		</div>
	);
}

Convert.propTypes = {
	spotifyLogin: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return {
		spotifyLogin: state.user.spotifyLogin,
	};
};
export default connect(mapStateToProps)(Convert);

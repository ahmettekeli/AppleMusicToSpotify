import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import SongCard from "./SongCard";
import { colors } from "../Utils/variables";

const useStyles = makeStyles({
	cardContainer: {
		alignItems: "center",
		width: "70vw",
		height: "70vh",
		padding: "1rem",
		margin: "20px auto",
		backgroundColor: colors.lightBackground,
		overflowY: "auto",
		borderRadius: "5px",
		boxShadow:
			"0 0.7px 2.2px rgba(0, 0, 0, 0.081), 0 2.2px 7.4px rgba(0, 0, 0, 0.119), 0 10px 33px rgba(0, 0, 0, 0.2)",
	},
});

const CardContainer = (props) => {
	const classes = useStyles();
	const [songs, setSongs] = useState([]);
	const {tempConversionInfo, conversionInfo} = props;
	const getSongCards = (songCards) => {
			if (songCards) {
				return songCards.map((info) => (
					<SongCard
						key={info.id}
						isSuccess={info.isSuccess}
						song={info.song}
						artist={info.artist}
						album={info.album}
						image={info.image}
						url={info.url}
					/>
				));
			}
			return null;
		};
	const handleSongCards = useCallback(() => {
		return getSongCards(tempConversionInfo);
	},[tempConversionInfo]);

	useEffect(() => {
		setSongs(handleSongCards());
	}, [tempConversionInfo, conversionInfo, handleSongCards]);

	return <div className={classes.cardContainer}>{songs}</div>;
};

CardContainer.propTypes = {
	conversionInfo: PropTypes.array,
	tempConversionInfo: PropTypes.array,
	activeFilter: PropTypes.string,
	activeSorting: PropTypes.string,
};

const mapStateToProps = (state) => {
	return {
		conversionInfo: state.info.conversionInfo,
		tempConversionInfo: state.info.tempConversionInfo,
		activeFilter: state.info.activeFilter,
		activeSorting: state.info.activeSorting,
	};
};
export default connect(mapStateToProps)(CardContainer);

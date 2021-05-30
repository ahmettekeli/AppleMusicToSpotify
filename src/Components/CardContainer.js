import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import SongCard from "./SongCard";
import InfoCard from "./InfoCard";
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
	const handleCards = (props) => {
			return (
				<>
					{handleInfoCards(props.infoList)}
					{handleSongCards(props.songInfoList)}
				</>
			);
		},
		handleInfoCards = (infoCards) => {
			if (infoCards) {
				return infoCards.map((info) => <InfoCard key={info.id} isSuccess={info.isSuccess} data={info.data} />);
			}
		},
		handleSongCards = (songCards) => {
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

	return <div className={classes.cardContainer}>{handleCards(props)}</div>;
};

const mapStateToProps = (state) => {
	return {
		infoList: state.info.infoList,
		songInfoList: state.info.songInfoList,
	};
};
export default connect(mapStateToProps)(CardContainer);

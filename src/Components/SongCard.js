import React from "react";
import PropTypes from "prop-types";
import SongCardContent from "./SongCardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core";
import { colors, urls } from "../Utils/variables";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		height: "25%",
		marginBottom: theme.spacing(1),
	},
	cover: {
		width: "13vw",
	},
}));

const SongCard = (props) => {
	const classes = useStyles();
	
	const getCardBgcolor = (isSuccess) => {
		if (isSuccess) {
			return colors.success;
		}
		return colors.danger;
	};

	return (
		<Card className={classes.root} style={{ backgroundColor: getCardBgcolor(props.isSuccess) }}>
			<CardMedia
				className={classes.cover}
				image={props.image || urls.songCardPlaceHolder}
				title={`${props.album} cover`}
			/>
			<SongCardContent url={props.url} song={props.song} artist={props.artist} isSuccess={props.isSuccess} />
		</Card>
	);
};

SongCard.propTypes = {
	image: PropTypes.string,
	album: PropTypes.string,
	song: PropTypes.string,
	artist: PropTypes.string,
	url: PropTypes.string,
	isSuccess: PropTypes.bool,
};

export default SongCard;

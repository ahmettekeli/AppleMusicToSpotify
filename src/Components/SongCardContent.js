import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SongCardInteractions from "./SongCardInteractions";

const useStyle = makeStyles({
	content: {
		display: "flex",
		flexDirection: "column",
		width: "25vw",
	},
	details: {
		width: "50vw",
		display: "flex",
		flexDirection: "column",
		paddingBottom: 0,
	},
});

function SongCardContent(props) {
	const classes = useStyle();
	return (
		<div className={classes.content}>
			<CardContent className={classes.details}>
				<Typography component="h6" variant="h6" noWrap>
					{props.song}
				</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					{props.artist}
				</Typography>
			</CardContent>
			<SongCardInteractions url={props.url} song={props.song} artist={props.artist} isSuccess={props.isSuccess} />
		</div>
	);
}

SongCardContent.propTypes = {
	song: PropTypes.string,
	artist: PropTypes.string,
	url: PropTypes.string,
	isSuccess: PropTypes.bool,
};

export default SongCardContent;

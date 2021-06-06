import React, { useState } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	interactions: {
		display: "flex",
		alignItems: "center",
		margin: 0,
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 40,
		width: 40,
	},
	copyIcon: {
		height: 35,
		width: 35,
	},
	searchIcon: {
		height: 40,
		width: 40,
	},
}));

function SongCardInteractions(props) {
	const [isSnackBarOpen, setIsSnackBarOpen] = useState(false),
		classes = useStyles(),
		handleSnackBarOpen = () => {
			setIsSnackBarOpen(true);
		},
		handleSnackBarClose = () => {
			setIsSnackBarOpen(false);
		},
		handlePlay = (songUrl) => {
			window.open(songUrl, "_blank");
		},
		handleCopyToClipboard = (songUrl) => {
			navigator.clipboard.writeText(songUrl);
			handleSnackBarOpen();
		},
		handleSearch = (song, artist) => {
			//!TODO where to search the song? google?
		};
	return (
		<div className={classes.interactions}>
			{props.isSuccess ? (
				<>
					<IconButton
						aria-label="play"
						onClick={() => {
							handleCopyToClipboard(props.url);
						}}
					>
						<FileCopyIcon className={classes.copyIcon} />
					</IconButton>
					<IconButton
						aria-label="play"
						onClick={() => {
							handlePlay(props.url);
						}}
					>
						<PlayArrowIcon className={classes.playIcon} />
					</IconButton>
				</>
			) : (
				<IconButton
					aria-label="play"
					onClick={() => {
						handleSearch(props.song, props.artist);
					}}
				>
					<SearchIcon className={classes.searchIcon} />
				</IconButton>
			)}
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={isSnackBarOpen}
				onClose={handleSnackBarClose}
				message="Song url is copied to the clipboard."
				key={1}
				autoHideDuration={2500}
			/>
		</div>
	);
}

SongCardInteractions.propTypes = {
	song: PropTypes.string,
	artist: PropTypes.string,
	url: PropTypes.string,
	isSuccess: PropTypes.bool,
};

export default SongCardInteractions;

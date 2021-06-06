import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "@material-ui/core/Tooltip";
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
		{ t } = useTranslation(),
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
					<Tooltip title={t("copy")} enterDelay={700} leaveDelay={200} arrow>
						<IconButton
							aria-label="copy"
							onClick={() => {
								handleCopyToClipboard(props.url);
							}}
						>
							<FileCopyIcon className={classes.copyIcon} />
						</IconButton>
					</Tooltip>
					<Tooltip title={t("play")} enterDelay={700} leaveDelay={200} arrow>
						<IconButton
							aria-label="play"
							onClick={() => {
								handlePlay(props.url);
							}}
						>
							<PlayArrowIcon className={classes.playIcon} />
						</IconButton>
					</Tooltip>
				</>
			) : (
				<Tooltip title={t("search")} enterDelay={700} leaveDelay={200} arrow>
					<IconButton
						aria-label="search"
						onClick={() => {
							handleSearch(props.song, props.artist);
						}}
					>
						<SearchIcon className={classes.searchIcon} />
					</IconButton>
				</Tooltip>
			)}
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={isSnackBarOpen}
				onClose={handleSnackBarClose}
				message={t("copiedToClipboard")}
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

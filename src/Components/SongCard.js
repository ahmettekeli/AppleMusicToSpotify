import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core";
import { colors, urls } from "../Utils/variables";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		height: "25%",
		marginBottom: theme.spacing(1),
	},
	details: {
		display: "flex",
		flexDirection: "column",
		width: "25vw",
	},
	content: {
		width: "50vw",
		display: "flex",
		flexDirection: "column",
		paddingBottom: 0,
	},
	cover: {
		width: "13vw",
	},
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
	playIcon: {
		height: 40,
		width: 40,
	},
}));

const SongCard = (props) => {
	const [isSnackBarOpen, setIsSnackBarOpen] = useState(false),
		classes = useStyles(),
		getCardBgcolor = (isSuccess) => {
			if (isSuccess) {
				return colors.success;
			}
			return colors.danger;
		},
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
		<Card className={classes.root} style={{ backgroundColor: getCardBgcolor(props.isSuccess) }}>
			<CardMedia
				className={classes.cover}
				image={props.image || urls.songCardPlaceHolder}
				title={`${props.album} cover`}
			/>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component="h6" variant="h6" noWrap>
						{props.song}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						{props.artist}
					</Typography>
				</CardContent>
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
								handleSearch(props.song);
							}}
						>
							<SearchIcon className={classes.searchIcon} />
						</IconButton>
					)}
				</div>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={isSnackBarOpen}
				onClose={handleSnackBarClose}
				message="Song url is copied to the clipboard."
				key={1}
				autoHideDuration={2500}
			/>
		</Card>
	);
};

export default SongCard;

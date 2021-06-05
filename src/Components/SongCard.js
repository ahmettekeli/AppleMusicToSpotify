import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
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
		width: 150,
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
}));

const SongCard = (props) => {
	const classes = useStyles(),
		getCardBgcolor = (isSuccess) => {
			if (isSuccess) {
				return colors.success;
			}
			return colors.danger;
		},
		handlePlay = (songUrl) => {
			window.open(songUrl, "_blank");
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
						<IconButton
							aria-label="play"
							onClick={() => {
								handlePlay(props.url);
							}}
						>
							<PlayArrowIcon className={classes.playIcon} />
						</IconButton>
					) : null}
				</div>
			</div>
		</Card>
	);
};

export default SongCard;

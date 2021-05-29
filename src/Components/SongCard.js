import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { makeStyles } from "@material-ui/core";
import { colors, imageUrls } from "../Utils/variables";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		marginBottom: theme.spacing(1),
	},
	details: {
		display: "flex",
		flexDirection: "column",
		width: "25vw",
	},
	content: {
		flex: "1 0 auto",
	},
	cover: {
		width: 150,
	},
	interactions: {
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 38,
		width: 38,
	},
}));

const SongCard = (props) => {
	console.log("songcard props", props);
	const classes = useStyles(),
		getCardBgcolor = (isSuccess) => {
			if (isSuccess) {
				return colors.success;
			}
			return colors.danger;
		},
		handlePlay = (songUrl) => {
			console.log({ songUrl });
			window.open(songUrl, "_blank");
		};

	return (
		<Card className={classes.root} style={{ backgroundColor: getCardBgcolor(props.isSuccess) }}>
			<CardMedia
				className={classes.cover}
				image={props.image || imageUrls.songPlaceHolder}
				title={`${props.album} cover`}
			/>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="h5">
						{props.song}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						{props.artist}
					</Typography>
				</CardContent>
				<div className={classes.interactions}>
					<IconButton
						aria-label="share"
						onClick={() => {
							handlePlay(props.url);
						}}
					>
						<PlayArrowIcon className={classes.playIcon} />
					</IconButton>
				</div>
			</div>
		</Card>
	);
};

export default SongCard;

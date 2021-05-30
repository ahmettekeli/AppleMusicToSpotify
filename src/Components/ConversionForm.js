import React, { useState } from "react";
// import Modal from "react-modal";
import CardContainer from "./CardContainer";
import ProgressContainer from "./ProgressContainer";
import { convertPlaylist, getUserId } from "../Services/spotifyPlaylistService";
import { validateUrl } from "../Utils/utils";
import { parseAccessToken } from "../Utils/utils";
import InputField from "./InputField";
// import "./ConversionForm.css";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";
import { colors } from "../Utils/variables";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		borderRadius: "10px",
	},
	submit: {
		backgroundColor: colors.success,
		marginTop: theme.spacing(2),
	},
	formContainer: {
		backgroundColor: colors.lightBackground,
		display: "flex",
		flexDirection: "column",
		width: "60%",
		background: "#fff",
		overflow: "auto",
		borderRadius: "4px",
		outline: "none",
		padding: theme.spacing(1),
		margin: theme.spacing(1),
	},
}));

function ConversionForm(props) {
	const [appleMusicPlaylistUrl, setAppleMusicPlaylistUrl] = useState(""),
		[spotifyPlaylistName, setSpotifyPlaylistName] = useState(""),
		[spotifyPlaylistDescription, setSpotifyPlaylistDescription] = useState(""),
		[isModalOpen, setIsModalOpen] = useState(false),
		classes = useStyles();

	const inputFields = [
		{
			label: "Playlist Url",
			value: appleMusicPlaylistUrl,
			onChange: (e) => setAppleMusicPlaylistUrl(e.target.value),
			helperText: "Please enter a valid url",
			hasError: true,
			isRequired: true,
		},
		{
			label: "Playlist Name",
			value: spotifyPlaylistName,
			onChange: (e) => setSpotifyPlaylistName(e.target.value),
			helperText: "Please enter a playlist name",
			hasError: false,
			isRequired: false,
		},
		{
			label: "Playlist Description",
			value: spotifyPlaylistDescription,
			onChange: (e) => setSpotifyPlaylistDescription(e.target.value),
			helperText: "Please enter a playlist description",
			hasError: false,
			isRequired: false,
		},
	];

	const handleConversion = async (e) => {
			e.preventDefault();
			handleModalOpen();
			//show modal
			//clear previous inforcards
			//clear progress bar status.
			if (validateUrl(appleMusicPlaylistUrl)) {
				const params = {
					url: appleMusicPlaylistUrl,
					name: spotifyPlaylistName,
					description: spotifyPlaylistDescription,
				};
				const apiToken = parseAccessToken(props.query);
				const userId = await getUserId(apiToken);
				//resetting progressbar here.
				// store.dispatch(updateSongCount(0));
				setIsModalOpen(true);
				convertPlaylist(userId, apiToken, params);
			} else {
				showValidationError();
			}
		},
		showValidationError = () => {
			// return <p className="validation-fail">Url is not valid.</p>;
			console.log("apple music playlist url is not valid");
		},
		createInputGroup = () => {
			return inputFields.map((inputElement, index) => (
				<InputField
					key={index}
					label={inputElement.label}
					value={inputElement.value}
					onChange={inputElement.onChange}
					required={inputElement.isRequired}
					helperText={inputElement.helperText}
				/>
			));
		},
		handleModalOpen = () => {
			setIsModalOpen(true);
		},
		handleModalClose = () => {
			setIsModalOpen(false);
		};
	return (
		<>
			{/* <div className="form-container"> */}
			<div className={classes.formContainer}>
				<form>
					{createInputGroup()}
					<Button
						variant="contained"
						startIcon={<LoopIcon />}
						onClick={handleConversion}
						className={classes.submit}
					>
						Convert
					</Button>
				</form>
			</div>
			<div>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={isModalOpen}
					onClose={handleModalClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={isModalOpen}>
						<div className={classes.paper}>
							<ProgressContainer />
							<CardContainer />
						</div>
					</Fade>
				</Modal>
			</div>
		</>
	);
}

export default ConversionForm;

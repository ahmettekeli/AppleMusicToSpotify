import React, { useState } from "react";
import PropTypes from "prop-types";
import store from "../redux/store";
import { clearSongInfos } from "../redux/reducers/info-actions";
import { useTranslation } from "react-i18next";
import CardContainer from "./CardContainer";
import ProgressContainer from "./ProgressContainer";
import ConversionLogField from "./ConversionLogField";
import FilterSortControls from "./FilterSortControls";
import InputField from "./InputField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";
import { makeStyles } from "@material-ui/core/styles";
import { convertPlaylist, getUserId } from "../Services/spotifyPlaylistService.js";
import { validateUrl } from "../Utils/utils";
import { parseAccessToken } from "../Utils/utils";
import { colors } from "../Utils/variables";

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
		justifyContent: "center",
		alignItems: "center",
		minWidth: "90%",
		background: "#fff",
		overflow: "auto",
		borderRadius: "4px",
		outline: "none",
		padding: theme.spacing(1),
		margin: theme.spacing(1),
	},
	form: {
		minWidth: "90%",
	}
}));

function ConversionForm(props) {
	const [appleMusicPlaylistUrl, setAppleMusicPlaylistUrl] = useState("");
	const [spotifyPlaylistName, setSpotifyPlaylistName] = useState("");
	const [spotifyPlaylistDescription, setSpotifyPlaylistDescription] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { t } = useTranslation();
	const classes = useStyles();

	const inputFields = [
		{
			label: t("playlistUrl"),
			value: appleMusicPlaylistUrl,
			onChange: (e) => setAppleMusicPlaylistUrl(e.target.value),
			helperText: t("playlistUrlHelperText"),
			hasError: true,
			isRequired: true,
		},
		{
			label: t("playlistName"),
			value: spotifyPlaylistName,
			onChange: (e) => setSpotifyPlaylistName(e.target.value),
			helperText: t("playlistNameHelperText"),
			hasError: false,
			isRequired: false,
		},
		{
			label: t("playlistDescription"),
			value: spotifyPlaylistDescription,
			onChange: (e) => setSpotifyPlaylistDescription(e.target.value),
			helperText: t("playlistDescriptionHelperText"),
			hasError: false,
			isRequired: false,
		},
	];

	const handleConversion = async (e) => {
		//!TODO make sure there is a validation before making an api call.
		e.preventDefault();
		store.dispatch(clearSongInfos());
		handleModalOpen();
		if (validateUrl(appleMusicPlaylistUrl)) {
			const params = {
				url: appleMusicPlaylistUrl,
				name: spotifyPlaylistName,
				description: spotifyPlaylistDescription,
			};
			const apiToken = parseAccessToken(props.query);
			const userId = await getUserId(apiToken);
			setIsModalOpen(true);
			convertPlaylist(userId, apiToken, params);
		} else {
			showValidationError();
		}
	};

	const showValidationError = () => {
		console.log("apple music playlist url is not valid");
	};
	const createInputGroup = () => {
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
	};
	const handleModalOpen = () => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
	};
	
	return (
		<>
			<div className={classes.formContainer}>
				<form className={classes.form}>
					{createInputGroup()}
					<Button
						variant="contained"
						startIcon={<LoopIcon />}
						onClick={handleConversion}
						className={classes.submit}
					>
						{t("convert")}
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
							<ConversionLogField />
							<FilterSortControls />
							<CardContainer />
						</div>
					</Fade>
				</Modal>
			</div>
		</>
	);
}

ConversionForm.propTypes = {
	query: PropTypes.string,
};

export default ConversionForm;

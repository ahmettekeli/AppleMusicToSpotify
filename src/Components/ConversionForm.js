import React, { useState } from "react";
import Modal from "react-modal";
import CardContainer from "./CardContainer";
import ProgressBar from "./ProgressBar";
import { convertPlaylist, getUserId } from "../Services/spotifyPlaylistService";
import { validateUrl } from "../Utils/utils";
import { parseAccessToken } from "../Utils/utils";
import InputField from "./InputField";
import "./ConversionForm.css";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";
import { colors } from "../Utils/variables";

function ConversionForm(props) {
	const [appleMusicPlaylistUrl, setAppleMusicPlaylistUrl] = useState(""),
		[spotifyPlaylistName, setSpotifyPlaylistName] = useState(""),
		[spotifyPlaylistDescription, setSpotifyPlaylistDescription] = useState(""),
		[isModalOpen, setIsModalOpen] = useState(false);

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
			setIsModalOpen(true);
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
		toggleModal = () => {
			setIsModalOpen(!isModalOpen);
		};
	return (
		<>
			<div className="form-container">
				<form>
					{createInputGroup()}
					<Button
						variant="contained"
						startIcon={<LoopIcon />}
						onClick={handleConversion}
						style={{ backgroundColor: colors.success }}
					>
						Convert
					</Button>
				</form>
			</div>
			<div>
				<Modal
					isOpen={isModalOpen}
					onRequestClose={toggleModal}
					appElement={document.getElementById("root")}
					contentLabel="Coversion Info Modal"
					className="conversion-form"
					overlayClassName="conversion-form-overlay"
					closeTimeoutMS={500}
				>
					<ProgressBar />
					<CardContainer />
					<button onClick={toggleModal}>Close</button>
				</Modal>
			</div>
		</>
	);
}

export default ConversionForm;

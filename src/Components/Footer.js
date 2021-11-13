import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { colors, urls } from "../Utils/variables";

const useStyles = makeStyles((theme) => ({
	footer: {
		display: "flex",
		minHeight: "20vh",
		backgroundColor: colors.footerBackground,
	},
	container: {
		display: "flex",
		flexDirection: "column",
		// justifyContent: "space-between",
		margin: theme.spacing(2),
		// padding: theme.spacing(2),
	},
	content: {
		color: colors.lightBackground,
		"&:visited": {
			color: colors.lightBackground,
		},
	},
	linksContainer: {
		margin: theme.spacing(1),
	},
	socialMediaContainer: {
		display: "flex",
	},
	socialMediaIcon: {
		color: colors.lightBackground,
	},
}));

function Footer(props) {
	const classes = useStyles();
	const { t } = useTranslation();

	const handleOnClick = (url) => {
		window.open(url, "_blank");
	};

	return (
		<footer className={classes.footer}>
			<div className={classes.container}>
				<div className={classes.linksContainer}>
					<Typography variant="h6" gutterBottom>
						<Link to={urls.internal.home} className={classes.content}>
							{t("howTo")}
						</Link>
					</Typography>
					<Typography variant="h6" gutterBottom>
						<Link to={urls.internal.convert} className={classes.content}>
							{t("convert")}
						</Link>
					</Typography>
				</div>
				<div className={classes.socialMediaContainer}>
					<IconButton onClick={() => handleOnClick(urls.github)}>
						<GitHubIcon className={classes.socialMediaIcon} />
					</IconButton>
					<IconButton onClick={() => handleOnClick(urls.linkedin)}>
						<LinkedInIcon className={classes.socialMediaIcon} />
					</IconButton>
					<IconButton onClick={() => handleOnClick(urls.twitter)}>
						<TwitterIcon className={classes.socialMediaIcon} />
					</IconButton>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

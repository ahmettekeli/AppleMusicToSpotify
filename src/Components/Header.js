import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LanguageIcon from "@material-ui/icons/Language";
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { colors } from "../Utils/variables";
import { languages } from "../Utils/translationResources";

const useStyles = makeStyles({
	header: {
		display: "flex",
		height: "7vh",
		backgroundColor: colors.success,
	},
	content: {
		display: "flex",
		justifyContent: "space-between",
	},
	logo: {},
	options: {
		display: "flex",
	},
	languageList: {
		width: "20vh",
		backgroundColor: colors.lightBackground,
	},
});
function Header() {
	const classes = useStyles(),
		[isDarkMode, setIsDarkMode] = useState(false),
		[showLanguageDrawer, setShowLanguageDrawer] = useState(false),
		handleThemeSwitch = () => {
			setIsDarkMode(!isDarkMode);
		},
		handleLanguageSelection = () => {
			toggleLanguageDrawer(false);
			//select language here
		},
		toggleLanguageDrawer = (isOpen) => {
			setShowLanguageDrawer(isOpen);
		};
	return (
		<header>
			<AppBar position={"static"} className={classes.header}>
				<Toolbar className={classes.content}>
					<Box className={classes.logo}>Logo</Box>
					<Box className={classes.options}>
						<IconButton
							onClick={() => {
								toggleLanguageDrawer(true);
							}}
						>
							<LanguageIcon />
						</IconButton>
						<IconButton onClick={handleThemeSwitch}>
							{isDarkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer
				classes={{ paper: classes.languageList }}
				anchor={"right"}
				open={showLanguageDrawer}
				onClose={() => {
					toggleLanguageDrawer(false);
				}}
			>
				<List>
					{Object.keys(languages).map((lang, index) => {
						return (
							<ListItem button key={lang}>
								<ListItemIcon></ListItemIcon>
								<ListItemText
									onClick={() => {
										handleLanguageSelection(languages[lang]);
									}}
								>
									{languages[lang].nativeName}
								</ListItemText>
							</ListItem>
						);
					})}
				</List>
			</Drawer>
		</header>
	);
}

export default Header;

// {Object.keys(languages).map((lang, index) => {
//     return (
//         <MenuItem key={index} value={lang}>
//             {languages[lang].nativeName}
//         </MenuItem>
//     );
// })}

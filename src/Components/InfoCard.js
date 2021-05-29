import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { colors } from "../Utils/variables";

const useStyles = makeStyles({
	root: {
		margin: "5px 0",
		width: "25vw",
	},
});

function InfoCard(props) {
	const classes = useStyles(),
		getCardBgcolor = (isSuccess) => {
			if (isSuccess) {
				return colors.success;
			}
			return colors.danger;
		};
	return (
		<Card className={classes.root} style={{ backgroundColor: getCardBgcolor(props.isSuccess) }}>
			<CardContent>
				<Typography color="textSecondary" component="h5" variant="h5">
					{props.data}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default InfoCard;

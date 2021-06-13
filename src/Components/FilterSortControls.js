import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { filterFailedInfo, filterSuccessfulInfo, searchSongInfo, setFilter } from "../redux/reducers/info-actions";
import { makeStyles } from "@material-ui/core";
import { colors } from "../Utils/variables";
import { ButtonGroup, Button } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		color: colors.successHover,
	},
	active: {
		backgroundColor: colors.success,
	},
});

function FilterSortControls(props) {
	const classes = useStyles(),
		[isFailedFilterActive, setIsFailedFilterActive] = useState(false),
		[isSuccessfulFilterActive, setIsSuccessfulFilterActive] = useState(false),
		handleSearch = (searchText) => {
			props.dispatch(searchSongInfo(searchText));
		},
		handleFilteringFailedInfo = () => {
			handleActiveFilter("failed");
			if (!isFailedFilterActive) {
				props.dispatch(filterFailedInfo());
			}
		},
		handleFilteringSuccessfulInfo = () => {
			handleActiveFilter("successful");
			if (!isSuccessfulFilterActive) {
				props.dispatch(filterSuccessfulInfo());
			}
		},
		handleActiveFilter = (filterType) => {
			if (filterType === "successful") {
				setIsFailedFilterActive(false);
				if (!isSuccessfulFilterActive) {
					setIsSuccessfulFilterActive(true);
					props.dispatch(setFilter("successful"));
				} else {
					setIsSuccessfulFilterActive(false);
				}
			} else {
				setIsSuccessfulFilterActive(false);
				if (!isFailedFilterActive) {
					setIsFailedFilterActive(true);
					props.dispatch(setFilter("failed"));
				} else {
					setIsFailedFilterActive(false);
				}
			}
		};
	return (
		<ButtonGroup variant="contained" className={classes.root} aria-label="Filter Sort Controls">
			<Button className={isFailedFilterActive ? classes.active : null} onClick={handleFilteringFailedInfo}>
				Failed
			</Button>
			<Button
				className={isSuccessfulFilterActive ? classes.active : null}
				onClick={handleFilteringSuccessfulInfo}
			>
				Successful
			</Button>
		</ButtonGroup>
	);
}

FilterSortControls.propTypes = {
	conversionInfo: PropTypes.array,
};

const mapStateToProps = (state) => {
	return {
		conversionInfo: state.info.conversionInfo,
		failedConversionInfo: state.info.failedInfo,
		successConversionInfo: state.info.successInfo,
		activeFilter: state.info.activeFilter,
	};
};
export default connect(mapStateToProps)(FilterSortControls);

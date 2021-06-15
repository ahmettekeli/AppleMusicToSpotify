import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	filterFailedSongInfo,
	filterSuccessfulSongInfo,
	searchSongInfo,
	sortSongInfoDescending,
	sortSongInfoAscending,
	setSorting,
	setFilter,
} from "../redux/reducers/info-actions";
import { makeStyles } from "@material-ui/core";
import { colors, filterSortControls } from "../Utils/variables";
import { ButtonGroup, Button } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "flex-end",
		boxShadow: "none",
	},
	active: {
		backgroundColor: colors.filterActive,
	},
	notActive: {
		backgroundColor: colors.filterNotActive,
	},
});

function FilterSortControls(props) {
	const classes = useStyles(),
		[isFailedFilterActive, setIsFailedFilterActive] = useState(false),
		[isSuccessfulFilterActive, setIsSuccessfulFilterActive] = useState(false),
		[isSortedAscending, setIsSortedAscending] = useState(false),
		[isSortedDescending, setIsSortedDescending] = useState(false),
		handleSearch = (searchText) => {
			props.dispatch(searchSongInfo(searchText));
		},
		handleFilteringFailedSongCards = () => {
			setIsSuccessfulFilterActive(false);
			if (!isFailedFilterActive) {
				setIsFailedFilterActive(true);
				props.dispatch(setFilter(filterSortControls.FILTER_FAILED));
				props.dispatch(filterFailedSongInfo());
			} else {
				setIsFailedFilterActive(false);
				props.dispatch(setFilter(null));
			}
		},
		handleFilteringSuccessfulSongCards = () => {
			setIsFailedFilterActive(false);
			if (!isSuccessfulFilterActive) {
				setIsSuccessfulFilterActive(true);
				props.dispatch(setFilter(filterSortControls.FILTER_SUCCESSFUL));
				props.dispatch(filterSuccessfulSongInfo());
			} else {
				setIsSuccessfulFilterActive(false);
				props.dispatch(setFilter());
			}
		},
		handleSortingAscending = () => {
			setIsSortedDescending(false);
			if (!isSortedAscending) {
				setIsSortedAscending(true);
				props.dispatch(setSorting(filterSortControls.SORT_ASCENDING));
				props.dispatch(sortSongInfoAscending());
			} else {
				setIsSortedAscending(false);
				props.dispatch(setSorting(null));
			}
		},
		handleSortingDescending = () => {
			setIsSortedAscending(false);
			if (!isSortedDescending) {
				setIsSortedDescending(true);
				props.dispatch(setSorting(filterSortControls.SORT_DESCENDING));
				props.dispatch(sortSongInfoDescending());
			} else {
				setIsSortedDescending(false);
				props.dispatch(setSorting(null));
			}
		};
	return (
		<ButtonGroup variant="contained" className={classes.root} aria-label="Filter Sort Controls">
			<Button
				className={isSortedDescending ? classes.active : classes.notActive}
				onClick={handleSortingAscending}
			>
				<SortIcon style={{ WebKitTransform: "scaleY(-1)", transform: "scaleY(-1)" }} />
			</Button>
			<Button
				className={isSortedAscending ? classes.active : classes.notActive}
				onClick={handleSortingDescending}
			>
				<SortIcon />
			</Button>
			<Button
				className={isFailedFilterActive ? classes.active : classes.notActive}
				onClick={handleFilteringFailedSongCards}
			>
				Failed
			</Button>
			<Button
				className={isSuccessfulFilterActive ? classes.active : classes.notActive}
				onClick={handleFilteringSuccessfulSongCards}
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
		failedConversionInfo: state.info.successfulConversionInfo,
		successConversionInfo: state.info.failedConversionInfo,
		activeFilter: state.info.activeFilter,
	};
};
export default connect(mapStateToProps)(FilterSortControls);

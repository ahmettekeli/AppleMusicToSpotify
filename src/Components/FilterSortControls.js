import React, { useState } from "react";
import { connect } from "react-redux";
import {
	filterFailedSongInfo,
	filterSuccessfulSongInfo,
	searchSongInfo,
	sortSongInfoDescending,
	sortSongInfoAscending,
	setSorting,
	setFilter,
	resetFilters,
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
			setIsFailedFilterActive(true);
			props.dispatch(setFilter(filterSortControls.FILTER_FAILED));
			props.dispatch(filterFailedSongInfo());
		},
		handleFilteringSuccessfulSongCards = () => {
			setIsFailedFilterActive(false);
			setIsSuccessfulFilterActive(true);
			props.dispatch(setFilter(filterSortControls.FILTER_SUCCESSFUL));
			props.dispatch(filterSuccessfulSongInfo());
		},
		handleSortingAscending = () => {
			setIsSortedDescending(false);
			setIsSortedAscending(true);
			props.dispatch(setSorting(filterSortControls.SORT_ASCENDING));
			props.dispatch(sortSongInfoAscending());
		},
		handleSortingDescending = () => {
			setIsSortedAscending(false);
			setIsSortedDescending(true);
			props.dispatch(setSorting(filterSortControls.SORT_DESCENDING));
			props.dispatch(sortSongInfoDescending());
		},
		handleResettingFilters = () => {
			props.dispatch(setSorting(null));
			props.dispatch(setFilter(null));
			props.dispatch(resetFilters());
		};
	return (
		<ButtonGroup variant="contained" className={classes.root} aria-label="Filter Sort Controls">
			<Button className={classes.notActive} onClick={handleResettingFilters}>
				Reset
			</Button>
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

export default connect()(FilterSortControls);

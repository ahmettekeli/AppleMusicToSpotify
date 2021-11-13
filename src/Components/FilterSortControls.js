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
import { makeStyles, withStyles } from "@material-ui/core";
import { colors, filterSortControls } from "../Utils/variables";
import { ButtonGroup, Button, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
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
	searchField: {
		width: "60%",
	},
	searchIcon: {
		color: colors.filterNotActive,
	},
});

//!TODO style search field.
const StyledSearchField = withStyles({
	root: {
		"& .MuiInput-outline:after": {
			borderColor: colors.inputFieldFocused,
		},
	},
})(TextField);

function FilterSortControls(props) {
	const classes = useStyles();
	const [isFailedFilterActive, setIsFailedFilterActive] = useState(false);
	const [isSuccessfulFilterActive, setIsSuccessfulFilterActive] = useState(false);
	const [isSortedAscending, setIsSortedAscending] = useState(false);
	const [isSortedDescending, setIsSortedDescending] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const handleSearch = (e) => {
		let searchText = e.target.value;
		setSearchValue(e.target.value);
		//!TODO validate search key first here.
		props.dispatch(searchSongInfo(searchText));
	};

	const handleFilteringFailedSongCards = () => {
		setIsSuccessfulFilterActive(false);
		setIsFailedFilterActive(true);
		props.dispatch(setFilter(filterSortControls.FILTER_FAILED));
		props.dispatch(filterFailedSongInfo());
	};

	const handleFilteringSuccessfulSongCards = () => {
		setIsFailedFilterActive(false);
		setIsSuccessfulFilterActive(true);
		props.dispatch(setFilter(filterSortControls.FILTER_SUCCESSFUL));
		props.dispatch(filterSuccessfulSongInfo());
	};

	const handleSortingAscending = () => {
		setIsSortedDescending(false);
		setIsSortedAscending(true);
		props.dispatch(setSorting(filterSortControls.SORT_ASCENDING));
		props.dispatch(sortSongInfoAscending());
	};

	const handleSortingDescending = () => {
		setIsSortedAscending(false);
		setIsSortedDescending(true);
		props.dispatch(setSorting(filterSortControls.SORT_DESCENDING));
		props.dispatch(sortSongInfoDescending());
	};

	const handleResettingFilters = () => {
		props.dispatch(setSorting(null));
		props.dispatch(setFilter(null));
		props.dispatch(resetFilters());
		//!TODO clear search input field here
	};
	
	return (
		<ButtonGroup variant="contained" className={classes.root} aria-label="Filter Sort Controls">
			<StyledSearchField
				className={classes.searchField}
				variant="outlined"
				value={searchValue}
				onChange={handleSearch}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			></StyledSearchField>
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

import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { colors } from "../Utils/variables";

const StyledTextField = withStyles({
	root: {
		"& label.Mui-focused": {
			color: colors.inputFieldFocused,
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: colors.inputFieldFocused,
		},
	},
})(TextField);

function InputField(props) {
	return (
		<div>
			<StyledTextField
				id="standard-basic"
				label={props.label}
				value={props.value}
				onChange={props.onChange}
				size={props.size}
				fullWidth
				// error={props.hasError}
				// helperText={props.hasError ? props.helperText : null}
				// required={props.isRequired}
			/>
		</div>
	);
}

InputField.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default InputField;

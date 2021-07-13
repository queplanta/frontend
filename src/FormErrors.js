import React, { useReducer, useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import {
  SnackbarContent,
  TextField,
  MenuItem,
  Box,
  withStyles,
} from "@material-ui/core";
import { getDisplayName } from "./lib/helpers.js";

function reducer(state, action) {
  switch (action.type) {
    case "append":
      return [...state, ...action.errors];
    case "set":
      return action.errors;
    default:
      throw new Error();
  }
}

const initialState = [];
export const FormErrorsContext = React.createContext(initialState);

export function hasFormErrors(WrappedComponent) {
  function HasFormErrors(props, ref) {
    const [errors, setFormErrors] = useReducer(reducer, initialState);
    return (
      <FormErrorsContext.Provider value={errors}>
        <WrappedComponent
          appendFormErrors={(errors) =>
            setFormErrors({ type: "append", errors })
          }
          setFormErrors={(errors) => setFormErrors({ type: "set", errors })}
          ref={ref}
          {...props}
        />
      </FormErrorsContext.Provider>
    );
  }

  HasFormErrors.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;

  return React.forwardRef(HasFormErrors);
}

export const SnackbarErrorContent = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.dark,
    marginBottom: theme.spacing(1),
  },
}))(SnackbarContent);

export const FormErrors = function (props) {
  const { filter, ...otherProps } = props;
  return (
    <FormErrorsContext.Consumer>
      {(errors) =>
        _.filter(errors, filter).map((error, index) => (
          <SnackbarErrorContent
            key={index}
            message={error.message}
            {...otherProps}
          />
        ))
      }
    </FormErrorsContext.Consumer>
  );
};

export function TextFieldWithError(props) {
  const { errorFilter, ...others } = props;
  return (
    <FormErrorsContext.Consumer>
      {(errors) => {
        const filteredErrors = errorFilter
          ? _.filter(errors, errorFilter).map((error) => error.message)
          : [];
        const errorText = _.join(filteredErrors, " \n");
        const hasError = filteredErrors.length > 0;
        return (
          <TextField error={hasError} helperText={errorText} {...others} />
        );
      }}
    </FormErrorsContext.Consumer>
  );
}

export function ChoiceFieldWithError(props) {
  const { errorFilter, choices, ...others } = props;
  return (
    <FormErrorsContext.Consumer>
      {(errors) => {
        const filteredErrors = errorFilter
          ? _.filter(errors, errorFilter).map((error) => error.message)
          : [];
        const errorText = _.join(filteredErrors, " \n");
        const hasError = filteredErrors.length > 0;
        return (
          <TextField error={hasError} helperText={errorText} {...others}>
            {choices.enumValues.map((e, i) => {
              return (
                <MenuItem key={i} value={e.name}>
                  {e.description}
                </MenuItem>
              );
            })}
          </TextField>
        );
      }}
    </FormErrorsContext.Consumer>
  );
}
export function InputRangeFieldWithError(props) {
  const {
    errorFilter,
    value: { lower, upper },
    ...others
  } = props;
  const [lowerValue, setLower] = useState(lower);
  const [upperValue, setUpper] = useState(upper);
  const handleLowerChange = (e) => {
    setLower(e.target.value);
    console.log(`lower on change ${e.target.value}`);
  };
  const handleUpperChange = (e) => {
    setUpper(e.target.value);
    console.log(`upper on change ${e.target.value}`);
  };

  return (
    <FormErrorsContext.Consumer>
      {(errors) => {
        const filteredErrors = errorFilter
          ? _.filter(errors, errorFilter).map((error) => error.message)
          : [];
        const errorText = _.join(filteredErrors, " \n");
        const hasError = filteredErrors.length > 0;
        return (
          <>
            <TextField
              onChange={handleLowerChange}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={lowerValue}
              error={hasError}
              helperText={errorText}
            />
            <Box sx={{ mx: 2 }}> até </Box>
            <TextField
              onChange={handleUpperChange}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={upperValue}
              error={hasError}
              helperText={errorText}
            />
          </>
        );
      }}
    </FormErrorsContext.Consumer>
  );
}

ChoiceFieldWithError.defaultProps = {
  choices: {},
};

ChoiceFieldWithError.propTypes = {
  choices: PropTypes.object.isRequired,
};

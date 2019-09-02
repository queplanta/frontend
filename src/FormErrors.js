import React, {useReducer} from 'react';
import _ from 'lodash';
import { SnackbarContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { getDisplayName } from './lib/helpers.js';

function reducer(state, action) {
  switch (action.type) {
		case 'append':
      return [...state, ...action.errors];
		case 'set':
      return action.errors;
    default:
      throw new Error();
  }
}

const initialState = [];
export const FormErrorsContext = React.createContext(initialState);

export function hasFormErrors(WrappedComponent) {
	function HasFormErrors(props) {
		const [errors, setFormErrors]  = useReducer(reducer, initialState)
		return <FormErrorsContext.Provider value={errors}>
			<WrappedComponent
				appendFormErrors={(errors) => setFormErrors({type: 'append', errors})}
				setFormErrors={(errors) => setFormErrors({type: 'set', errors})}
				{...props}
			/>
		</FormErrorsContext.Provider>
	}

	HasFormErrors.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
	
	return HasFormErrors
}

export function FormErrors(props) {
	return <FormErrorsContext.Consumer>
		{errors => _.filter(errors, props.filter).map((error, index) => <SnackbarContent
      key={index}
			message={error.message}
		/>)}	
	</FormErrorsContext.Consumer>
}

export function TextFieldWithError(props) {
  const {errorFilter, ...others} = props
	return <FormErrorsContext.Consumer>
    {errors => {
      const filteredErrors = errorFilter ? _.filter(errors, errorFilter).map(error => error.message) : []
      const errorText = _.join(filteredErrors, " \n")
      const hasError = filteredErrors.length > 0
      return <TextField
        error={hasError}
        helperText={errorText}
        {...others}
      />
    }}	
	</FormErrorsContext.Consumer>
}

import React, {useReducer} from 'react';
import _ from 'lodash';
import { SnackbarContent } from '@material-ui/core';

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

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
		{errors => _.filter(errors, props.filter).map(error => <SnackbarContent
			message={error.message}
		/>)}	
	</FormErrorsContext.Consumer>
}

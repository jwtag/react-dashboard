import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
	{
		sample: ['property'],
		setProperty: ['property']
	},
	{
		prefix: 'SAMPLE/'
	}
);

export const sampleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	property: null
});

/* ------------- Reducers ------------- */
export const setProperty = (state, {property}) => state.merge({property})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.SET_PROPERTY]: setProperty
});

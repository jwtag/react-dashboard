import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
	{
		accessToken: ['property'],
	},
	{
		prefix: 'LOGIN/'
	}
);

export const accessTokenTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	property: null
});

/* ------------- Reducers ------------- */
export const accessToken = (state, {accessToken}) => state.merge({accessToken});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.ACCESS_TOKEN]: accessToken
});


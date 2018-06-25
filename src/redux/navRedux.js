import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
	{
		pushPath: ['path'],
		clearPath: null
	},
	{
		prefix: 'NAV/'
	}
);

export const navTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	path: null
});

/* ------------- Reducers ------------- */

export const pushPath = (state, { path }) => state.merge({ path });
export const clearPath = (state, action) => state.merge({ path: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.PUSH_PATH]: pushPath,
	[Types.CLEAR_PATH]: clearPath
});

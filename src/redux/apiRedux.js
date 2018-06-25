import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
	{
		request: null,
		success: null,
		error: ['error']
	},
	{
		prefix: 'API/'
	}
);

export const apiTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	loading: false,
	error: false
});

/* ------------- Reducers ------------- */

export const request = (state, action) => state.merge({ loading: true, error: null });
export const success = (state, action) => state.merge({ loading: false, error: null });
export const error = (state, { error }) => state.merge({ error, loading: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.REQUEST]: request,
	[Types.SUCCESS]: success,
	[Types.ERROR]: error
});

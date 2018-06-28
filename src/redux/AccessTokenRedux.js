import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
	{
        createAccessToken: ['providerToken'],
        accessTokenCreated: ['accessToken', 'expiresIn'],
        accessTokenCreationFailed: ['failureMessage']
	},
	{
		prefix: 'ACCESS_TOKEN/'
    }
);

export const accessTokenTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    accessToken: null,
    expirationDate: null,
    accessTokenCreationFailed: "Token Creation Failed. :("
});

/* ------------- Reducers ------------- */
export const onAccessTokenCreated = (state, {accessToken, expiresIn}) => {
    return state.merge({accessToken, expirationDate: new Date().getTime() + (expiresIn * 1000)});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.ACCESS_TOKEN_CREATED]: onAccessTokenCreated
});


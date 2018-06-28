import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
	{
        createAccessToken: ['providerToken'],
        accessTokenCreated: ['accessToken', 'expirationDate'],
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
    providerToken: null,
    accessToken: null,
    expirationDate: null,
    failureMessage: "Token Creation Failed. :("
});

/* ------------- Reducers ------------- */
export const onAccessTokenCreated = (state, {accessToken, expiresIn}) => {
    console.log('whoopeee');
    return state.merge({accessToken, expirationDate: new Date().getTime() + (expiresIn * 1000)});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ACCESS_TOKEN_CREATED]: onAccessTokenCreated
});


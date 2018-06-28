import { put, call } from 'redux-saga/effects';
import AccessTokenActions from '../redux/AccessTokenRedux';

export function* createAccessToken(api, {providerToken})
{
    console.log("entered loginsagas login");
	try
	{
		const response = api.signIn(providerToken);
		console.log(response);
		if(response.ok) return yield put(AccessTokenActions.accessTokenCreated(response.body.accessToken, response.body.expiresIn))
        else return yield put(AccessTokenActions.accessTokenCreationFailed())
	} catch (e) {
		yield put(AccessTokenActions.accessTokenCreationFailed())
	}
}
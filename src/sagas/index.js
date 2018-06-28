import { all, takeLatest } from 'redux-saga/effects';
import api from '../utilities/api';

//Types
import { accessTokenTypes } from '../redux/AccessTokenRedux';

//Sagas
import { createAccessToken } from '../sagas/AccessTokenSagas';

export default function*()
{
	//Place sagas here
	yield all([
		takeLatest(accessTokenTypes.CREATE_ACCESS_TOKEN, createAccessToken, api)
	]);
}

import { all, takeLatest } from 'redux-saga/effects';
import api from '../utilities/api';

//Types
import { sampleTypes } from '../redux/sampleRedux'
import { accessTokenTypes } from '../components/SignInButton/AccessTokenRedux';

//Sagas
import { sampleSaga } from './sampleSagas'
import { login } from '../components/SignInButton/LoginSagas';

export default function*()
{
	//Place sagas here
	yield all([
		takeLatest(sampleTypes.SAMPLE, sampleSaga, api),
		takeLatest(accessTokenTypes.ACCESS_TOKEN, login, api)
	]);
}

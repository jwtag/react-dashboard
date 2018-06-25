import { all, takeLatest } from 'redux-saga/effects';
import api from '../utilities/api';

//Types
import { sampleTypes } from '../redux/sampleRedux'

//Sagas
import { sampleSaga } from './sampleSagas'

export default function*()
{
	//Place sagas here
	yield all([
		takeLatest(sampleTypes.SAMPLE, sampleSaga, api)
	]);
}

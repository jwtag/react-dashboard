import { put, call } from 'redux-saga/effects';
import sampleActions from '../redux/sampleRedux';
import apiActions from '../redux/apiRedux';

export function* sampleSaga(api, action)
{
	const { property } = action;
	try
	{
		yield put(apiActions.request());
		const result = yield call(api.sample, { property });
		yield put(apiActions.success());
		yield put(sampleActions.setProperty(result.property));
	} catch (e)
	{
		const { message } = e;
		yield put(apiActions.error({ message }));
	}
}

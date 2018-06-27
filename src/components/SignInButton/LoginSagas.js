import { put, call } from 'redux-saga/effects';
import apiActions from '../../redux/apiRedux';
import accessTokenActions from './AccessTokenRedux';
import api from '../../utilities/api';

export function* login(api, action)
{
    console.log("entered loginsagas login");
	const { property } = action;
	try
	{
        console.log("entered loginsagas try");
        yield put(apiActions.request());
        console.log("made it b4 result");
        const result = yield call(api.login(property), { property });
        console.log("post result");
		yield put(apiActions.success());
		yield put(AccessTokenReduxActions.accessToken(result.property));
	} catch (e)
	{
		const { message } = e;
		yield put(apiActions.error({ message }));
	}
}
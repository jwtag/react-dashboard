import { stepper, error } from '../setup';
import { call, put } from 'redux-saga/effects';
import { sampleSaga } from '../../src/sagas/sampleSagas';
import sampleActions from '../../src/redux/sampleRedux';
import apiActions from '../../src/redux/apiRedux';
import api from '../mock/api';


test('sampleSaga - success', () =>
{
	const action = {		
		property: 'foo'		
	};
	const step = stepper(sampleSaga(api, action));
	expect(step()).toEqual(put(apiActions.request()));
	expect(step()).toEqual(call(api.sample, { property: 'foo' }));
	expect(step({property: 'foo'})).toEqual(put(apiActions.success()));
	expect(step()).toEqual(put(sampleActions.setProperty('foo')));
	expect(step()).toEqual(undefined);
});

test('sampleSaga - failure', () =>
{
	const action = {
		property: 'foo'
	};
	const step = stepper(sampleSaga(api, action));
	expect(step()).toEqual(put(apiActions.request()));
	expect(step()).toEqual(call(api.sample, { property: 'foo' }));
	expect(step(error)).toEqual(put(apiActions.error({ message: error.message })));
	expect(step()).toEqual(undefined);
});
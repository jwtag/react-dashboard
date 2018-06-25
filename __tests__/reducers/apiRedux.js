import Actions, { reducer, INITIAL_STATE } from '../../src/redux/apiRedux';

test('request', () =>
{
	const state = reducer(INITIAL_STATE, Actions.request());
	expect(state.loading).toEqual(true);
	expect(state.error).toEqual(null);
});

test('success', () =>
{
	const state = reducer(INITIAL_STATE, Actions.success());
	expect(state.loading).toEqual(false);
	expect(state.error).toEqual(null);
});

test('error', () =>
{
	const state = reducer(INITIAL_STATE, Actions.error({ message: 'Error' }));
	expect(state.loading).toEqual(false);
	expect(state.error).toEqual({ message: 'Error' });
});

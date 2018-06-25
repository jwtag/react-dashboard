import { selectLoading, selectError } from '../../src/selectors/apiSelectors';

const state = {
	api: {
		loading: true,
		error: {
			message: 'Error'
		}
	}
};

test('selectLoading', () =>
{
	expect(selectLoading(state)).toEqual(state.api.loading);
});

test('selectError', () =>
{
	expect(selectError(state)).toEqual(state.api.error);
});

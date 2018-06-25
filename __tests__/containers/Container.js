import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Container from '../../src/containers/Container';
import apiActions from '../../src/redux/apiRedux';

const mockStore = configureMockStore();

class TestComponent extends React.Component
{
	render()
	{
		return <div>Test</div>;
	}
}

function setup(store)
{
	const context = { store };
	const Element = Container(TestComponent);
	const enzymeWrapper = mount(<Element />, { context });
	return {
		enzymeWrapper
	};
}

describe('Container', () =>
{
	it('should wrap a component and reset errors on mount', done =>
	{
		const emptyStore = mockStore({
			api: { loading: false, error: null }
		});
		const { enzymeWrapper } = setup(emptyStore);
		expect(enzymeWrapper.find('TestComponent').length).toEqual(1);
		expect(getLastAction(emptyStore)).toEqual(apiActions.error(null));
		done();
	});
});

function getLastAction(store)
{
	const actions = store.getActions();
	return actions[actions.length - 1];
}

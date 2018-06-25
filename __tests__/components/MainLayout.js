import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MainLayout from '../../src/components/MainLayout';
import SampleContainer from '../../src/containers/SampleContainer';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore();

describe('MainLayout', () =>
{
	it('shoud main layout and default container', done =>
	{
		const emptyStore = mockStore({
			api: {},
			user: {},
			order: {}
		});

		const enzymeWrapper = mount(
			<Provider store={emptyStore}><MemoryRouter initialEntries={['/main/sample']} initialIndex={0}><MainLayout /></MemoryRouter></Provider>
		);
		expect(enzymeWrapper.find('Sidebar').length).toEqual(1);
		expect(enzymeWrapper.find('Switch').length).toEqual(1);
		expect(enzymeWrapper.find('.page-title').text()).toEqual('React Dashboard');
		
		const route = enzymeWrapper.find('Switch Route');
		expect(route.length).toEqual(1)
		expect(route.props().path).toEqual('/main/sample');
		expect(route.props().component).toEqual(SampleContainer);
		
		// Default route
		expect(enzymeWrapper.find('SampleContainer').length).toEqual(1);
		done();
	});
});

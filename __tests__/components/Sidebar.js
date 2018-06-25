import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../../src/components/Sidebar';
import { MemoryRouter } from 'react-router-dom';
import mockLogo from '../mock/assets.js';

describe('Sidebar', () =>
{
	it('shoud render sidebar and links', done =>
	{
		const sections = [{ name: 'Sample', uri: '/main/sample' }];
		const enzymeWrapper = mount(<MemoryRouter><Sidebar /></MemoryRouter>);
		const links = enzymeWrapper.find('NavLink');
		expect(links.length).toEqual(sections.length);
		links.forEach((l, i) =>
		{
			expect(l.props().to).toEqual(sections[i].uri);
			expect(l.text()).toEqual(sections[i].name);
		});

		expect(enzymeWrapper.find('.sidebar').length).toEqual(1);
		expect(enzymeWrapper.find('nav .sidebar-nav').length).toEqual(1);
		expect(enzymeWrapper.find('.img-container').length).toEqual(1);
		// const logo = enzymeWrapper.find('.img-container img');
		// expect(logo.length).toEqual(1);
		// expect(logo.props().src).toEqual(mockLogo);
		done();
	});
});

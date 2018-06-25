import React from 'react';
import { mount } from 'enzyme';
import SearchBar from '../../src/components/SearchBar';

function setup(opts = {})
{
	const defaultProps = {
		search: jest.fn()
	};

	const props = Object.assign({}, defaultProps, opts);
	const enzymeWrapper = mount(<SearchBar {...props} />);
	return {
		props,
		enzymeWrapper
	};
}

describe('SearchBar', () =>
{
	it('shoud render input and button', done =>
	{
		const { enzymeWrapper, props } = setup({});
		expect(enzymeWrapper.find('Input').length).toEqual(1);
		let button = enzymeWrapper.find('FormButton');
		expect(button.props().disabled).toEqual(true);

		const input = enzymeWrapper.find('input');
		input.simulate('change', { target: { name: 'input', value: '1' } });
		expect(enzymeWrapper.state().input).toEqual('1');
		button = enzymeWrapper.find('FormButton');
		expect(button.props().disabled).toEqual(false);
		enzymeWrapper.find('form').simulate('submit');
		expect(props.search.mock.calls.length).toEqual(1);
		done();
	});

	it('loading - button should remain disabled', done =>
	{
		const { enzymeWrapper, props } = setup({ loading: true });
		expect(enzymeWrapper.find('Input').length).toEqual(1);
		let button = enzymeWrapper.find('FormButton');
		expect(button.props().disabled).toEqual(true);

		const input = enzymeWrapper.find('input');
		input.simulate('change', { target: { name: 'input', value: '1' } });
		expect(enzymeWrapper.state().input).toEqual('1');
		button = enzymeWrapper.find('FormButton');
		expect(button.props().disabled).toEqual(true);
		button.simulate('click');
		expect(props.search.mock.calls.length).toEqual(0);
		done();
	});
});

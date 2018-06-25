import React from 'react';
import { mount } from 'enzyme';
import Select from '../../src/components/Select';

function setup(opts = {})
{
	const defaultProps = {
		id: 'state',
		label: 'State',
		name: 'state',
		valueSet: opts.valueSet,
		value: opts.value,
		options: [{ value: 1, name: 'created' }, { value: 2, name: 'fulfilled' }],
		onChange: jest.fn(),
		errors: opts.error,
		warning: opts.warning
	};

	const props = Object.assign({}, defaultProps, opts);
	const enzymeWrapper = mount(<Select {...props} />);
	return {
		props,
		enzymeWrapper
	};
}

describe('Select', () =>
{
	it('shoud render label and select input w/ valuye prop', done =>
	{
		const { enzymeWrapper, props } = setup({ value: 1 });
		const select = enzymeWrapper.find('select');
		expect(select.length).toEqual(1);
		shared(enzymeWrapper, props, select);
		done();
	});

	it('shoud render label and select input w/ valueSet prop', done =>
	{
		const { enzymeWrapper, props } = setup({ valueSet: { state: 1 } });
		const select = enzymeWrapper.find('select');
		expect(select.length).toEqual(1);
		shared(enzymeWrapper, props, select);
		done();
	});

	it('shoud render select input with errors and warnings', done =>
	{
		const { enzymeWrapper, props } = setup({ value: 1, warning: 'Warning', error: 'Error' });
		const select = enzymeWrapper.find('select');
		expect(select.length).toEqual(1);

		const error = enzymeWrapper.find('.error');
		const warning = enzymeWrapper.find('.warning');

		expect(error.length).toEqual(1);
		expect(error.text()).toEqual(props.error);
		expect(warning.length).toEqual(1);
		expect(warning.text()).toEqual(props.warning);
		done();
	});
});

function shared(enzymeWrapper, props, select)
{
	expect(select.length).toEqual(1);

	// Props passed to select element
	const selectProps = select.props();
	expect(selectProps.value).toEqual(1);
	expect(selectProps.id).toEqual(props.id);
	expect(selectProps.name).toEqual(props.name);
	expect(enzymeWrapper.find('label').text()).toEqual(props.label);
	expect(selectProps.onChange).toEqual(props.onChange);

	//Options rendered
	const options = enzymeWrapper.find('option');
	expect(options.length).toEqual(props.options.length);
	options.forEach((o, i) =>
	{
		expect(o.props().value).toEqual(props.options[i].value);
		expect(o.text()).toEqual(props.options[i].name);
	});

	expect(enzymeWrapper.find('.error').length).toEqual(0);
	expect(enzymeWrapper.find('.warning').length).toEqual(0);
}

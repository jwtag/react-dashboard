import React from 'react';
import { mount } from 'enzyme';
import Input from '../../src/components/Input';

function setup(opts = {})
{
	const values = opts.valueSet || {
		title: 'title'
	};

	const defaultProps = {
		id: 'title',
		label: 'Title',
		type: 'text',
		maxLength: '10',
		valueSet: values,
		onBlur: jest.fn(),
		onChange: jest.fn(),
		errors: opts.errors || {},
		warnings: opts.warnings || {}
	};

	const props = Object.assign({}, defaultProps, opts);
	const enzymeWrapper = mount(<Input {...props} />);
	return {
		props,
		enzymeWrapper
	};
}

describe('Input', () =>
{
	it('shoud render label and text input', done =>
	{
		const { enzymeWrapper, props } = setup();

		//Input
		const input = enzymeWrapper.find('input');
		expect(input.props().type).toEqual(props.type);
		shared(enzymeWrapper, props, input);
		done();
	});

	it('shoud render text input and error', done =>
	{
		const { enzymeWrapper, props } = setup({ errors: { title: 'Title error' } });

		//Input
		const input = enzymeWrapper.find('input');
		expect(input.props().type).toEqual(props.type);
		shared(enzymeWrapper, props, input);
		done();
	});

	it('shoud render text input and warning', done =>
	{
		const { enzymeWrapper, props } = setup({ warnings: { title: 'Title warning' } });

		//Input
		const input = enzymeWrapper.find('input');
		expect(input.props().type).toEqual(props.type);
		shared(enzymeWrapper, props, input);
		done();
	});

	it('shoud render label and textarea', done =>
	{
		const { enzymeWrapper, props } = setup({ type: 'textarea' });

		//Texarea
		const textarea = enzymeWrapper.find('textarea');
		shared(enzymeWrapper, props, textarea);
		done();
	});

	it('shoud textarea and error', done =>
	{
		const { enzymeWrapper, props } = setup({ type: 'textarea', errors: { title: 'Title errors' } });

		//Texarea
		const textarea = enzymeWrapper.find('textarea');
		expect(textarea.length).toEqual(1);
		shared(enzymeWrapper, props, textarea);
		done();
	});

	it('shoud textarea and warning', done =>
	{
		const { enzymeWrapper, props } = setup({ type: 'textarea', errors: { warning: 'Title warning' } });

		//Texarea
		const textarea = enzymeWrapper.find('textarea');
		expect(textarea.length).toEqual(1);
		shared(enzymeWrapper, props, textarea);
		done();
	});
});

function shared(enzymeWrapper, props, el)
{
	expect(el.length).toEqual(1);
	const elProps = el.props();
	expect(elProps.name).toEqual(props.id);

	//Label
	expect(enzymeWrapper.find('label').text()).toEqual(props.label);
	expect(elProps.maxLength).toEqual(props.maxLength);

	//Interaction
	el.simulate('change');
	expect(props.onChange.mock.calls.length).toEqual(1);
	el.simulate('blur');
	expect(props.onBlur.mock.calls.length).toEqual(1);

	//Errors
	if (props.errors[props.id])
	{
		expect(enzymeWrapper.find('.error').text()).toEqual(props.errors[props.id]);
	} else
	{
		expect(enzymeWrapper.find('.error').length).toEqual(0);
	}
	if (props.warnings[props.id])
	{
		expect(enzymeWrapper.find('.warning').text()).toEqual(props.warnings[props.id]);
	} else
	{
		expect(enzymeWrapper.find('.warning').length).toEqual(0);
	}
}

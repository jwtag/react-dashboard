import React from 'react';
import { mount } from 'enzyme';
import FormButton from '../../src/components/FormButton';

function setup(opts)
{
	const defaultProps = {
		disabled: false,
		className: 'btn btn-primary',
		onClick: jest.fn(),
		value: 'Enabled'
	};
	const props = Object.assign({}, defaultProps, opts);
	const enzymeWrapper = mount(<FormButton {...props} />);
	return {
		props,
		enzymeWrapper
	};
}

describe('FormButton', () =>
{
	it('enabled - shoud render self and components', done =>
	{
		const { enzymeWrapper, props } = setup();

		const button = enzymeWrapper.find('button');
		const buttonProps = button.props();
		expect(button.text()).toEqual(props.value);
		expect(button.hasClass(props.className)).toEqual(true);
		expect(button.hasClass('disabled')).toEqual(false);
		expect(buttonProps.disabled).toEqual(props.disabled);

		button.simulate('click');
		expect(props.onClick.mock.calls.length).toEqual(1);
		done();
	});

	it('disabled - shoud render self and components', done =>
	{
		const { enzymeWrapper, props } = setup({ value: 'Disabled', disabled: true });

		const button = enzymeWrapper.find('button');
		const buttonProps = button.props();
		expect(button.text()).toEqual(props.value);
		expect(button.hasClass(props.className));
		expect(button.hasClass('disabled')).toEqual(true);
		expect(buttonProps.disabled).toEqual(props.disabled);

		button.simulate('click');
		expect(props.onClick.mock.calls.length).toEqual(0);
		done();
	});

	it('Default props - shoud render self and components', done =>
	{
		const enzymeWrapper = mount(<FormButton value="Default" />);
		const containerProps = enzymeWrapper.props();
		expect(containerProps.disabled).toEqual(false);
		expect(containerProps.className).toEqual('btn btn-primary');
		expect(typeof containerProps.onClick).toEqual('function');
		enzymeWrapper.find('button').simulate('click');
		done();
	});
});

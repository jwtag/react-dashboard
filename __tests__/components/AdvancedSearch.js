import React from 'react';
import { mount } from 'enzyme';
import AdvancedSearch from '../../src/components/AdvancedSearch';
import { capitalize } from '../../src/utilities/utilities';

function setup(opts = {})
{
	const defaultProps = {
		submit: jest.fn()
	};

	const props = Object.assign({}, defaultProps, opts);
	const enzymeWrapper = mount(<AdvancedSearch {...props} />);
	return {
		props,
		enzymeWrapper
	};
}

describe('AdvancedSearch', () =>
{
	it('shoud render advanced search fields', done =>
	{
		const fields = [
			{
				name: 'name',
				label: 'Name'
			},
			{
				name: 'number',
				label: 'Number',
				mask: '\\d'
			},
			'property',
			{
				name: 'foo',
				label: 'Foo',
				type: 'select',
				options: [
					{
						name: 'Bar',
						value: 'bar'
					},
					{
						name: 'Baz',
						value: 'baz'
					}
				]
			}
		];
		const { enzymeWrapper, props } = setup({ fields });

		//Input types
		expect(enzymeWrapper.find('input').length).toEqual(3);
		expect(enzymeWrapper.find('select').length).toEqual(1);

		fields.forEach((f, i) =>
		{
			let input;
			if (f.name === 'foo')
			{
				input = enzymeWrapper.find('Select');
				expect(input.find('label').text()).toEqual(f.label);
				expect(input.props().id).toEqual(f.name);
				expect(input.props().name).toEqual(f.name);
				expect(input.find('option').length).toEqual(f.options.length);
				input.find('options').forEach((o, idx) =>
				{
					expect(o.props().value).toEqual(f.options[idx].value);
					expect(o.props().text()).toEqual(f.options[idx].name);
				});
			} else if (typeof f === 'string')
			{
				input = enzymeWrapper.find(`Input#${f}`);
				expect(input.find('label').text()).toEqual(capitalize(f));
				expect(input.props().id).toEqual(f);
				expect(input.props().name).toEqual(f);
			} else
			{
				input = enzymeWrapper.find(`Input#${f.name}`);
				expect(input.find('label').text()).toEqual(f.label);
				expect(input.props().id).toEqual(f.name);
				expect(input.props().name).toEqual(f.name);
			}
		});

		//Select
		const selectField = props.fields[props.fields.length - 1];
		const options = enzymeWrapper.find('option');
		expect(options.length).toEqual(selectField.options.length);
		options.forEach((o, i) =>
		{
			if (!selectField.options[i].value) return;
			expect(o.props().value).toEqual(selectField.options[i].value);
			expect(o.text()).toEqual(selectField.options[i].name);
		});

		//Fields per row
		const groups = enzymeWrapper.find('.form-row');
		expect(groups.length).toEqual(2);
		groups.forEach(g =>
		{
			expect(g.find('.form-control').length).toEqual(2);
		});

		//Masks
		const masked = enzymeWrapper.find('input#number');
		masked.simulate('change', { target: { name: 'number', value: 'a' } });
		expect(enzymeWrapper.state().number).toEqual('');
		masked.simulate('change', { target: { name: 'number', value: 1 } });
		expect(enzymeWrapper.state().number).toEqual(1);

		let form = enzymeWrapper.find('form');
		form.simulate('submit');
		expect(props.submit.mock.calls.length).toEqual(1);

		done();
	});

	it('shoud render no fields - invalid fields', done =>
	{
		let { enzymeWrapper } = setup({ fields: [null, undefined] });
		expect(enzymeWrapper.find('.form-control').length).toEqual(0);
		done();
	});

	it('shoud render no fields - no fields', done =>
	{
		let { enzymeWrapper } = setup({});
		expect(enzymeWrapper.find('.form-control').length).toEqual(0);
		done();
	});

	it('shoud render no fields - invalid field config', done =>
	{
		const fields = [{ id: 'id', label: 'label' }];
		expect(() => setup({ fields })).toThrow('Input config must have a name');
		done();
	});
});

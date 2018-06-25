import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import FormButton from './FormButton';
import { capitalize, stripEmptyValues, getType } from '../utilities/utilities';

export default class AdvancedSearch extends React.Component
{
	static propTypes = {
		fields: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
		submit: PropTypes.func.isRequired,
		fieldsPerRow: PropTypes.number
	};

	static defaultProps = {
		fields: [],
		fieldsPerRow: 2
	};

	constructor(props)
	{
		super(props);
		this.state = this.initalizeState(this.props.fields);
		this._masks = this.setMasks(this.props.fields);

		this.renderInput = this.renderInput.bind(this);
		this.renderRow = this.renderRow.bind(this);
		this.renderFields = this.renderFields.bind(this);
		this.onChange = this.onChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	initalizeState(fields)
	{
		return fields.reduce((st, field) =>
		{
			if (getType(field) === 'String') st[field] = '';
			else if (getType(field) === 'Object' && !!field.name) st[field.name] = '';
			return st;
		}, {});
	}

	makeMaskFn(form)
	{
		const regex = new RegExp(form);
		return val => regex.test(val);
	}

	setMasks(fields)
	{
		return fields.reduce((masks, field) =>
		{
			if (!field) return masks;
			const name = getType(field) === 'String' ? field : field.name;
			if (!name) return masks;
			if (field.mask) masks[name] = this.makeMaskFn(field.mask);
			return masks;
		}, {});
	}

	onChange({ target })
	{
		const { name, value } = target;
		if (this._masks[name] && !this._masks[name](value)) return;

		this.setState({ [name]: value });
	}

	submit(e)
	{
		e.preventDefault();
		const data = stripEmptyValues(this.state);
		this.props.submit(data);
	}

	renderInput(cnfg, key)
	{
		if (!cnfg) return null;
		let config = cnfg;
		if (getType(cnfg) === 'String')
		{
			config = {
				name: cnfg,
				id: cnfg,
				type: 'text'
			};
		}

		if (!config.name) throw new Error('Input config must have a name');

		if (config.type === 'select')
		{
			return (
				<Select
					key={key}
					name={config.name}
					id={config.id || config.name}
					options={config.options}
					onChange={this.onChange}
					valueSet={this.state}
					label={config.label}
					required={config.required}
					onBlur={config.onBlur}
				/>
			);
		}

		return (
			<Input
				key={key}
				name={config.name}
				label={config.label || capitalize(config.name)}
				type={config.type || 'text'}
				id={config.id || config.name}
				valueSet={this.state}
				onChange={this.onChange}
				onBlur={config.onBlur}
				maxLength={config.maxLength}
				required={config.required}
				placeholder={config.placeholder}
			/>
		);
	}

	renderRow(inputs, key)
	{
		return (
			<div className="form-row" key={key}>
				{inputs.map(this.renderInput)}
			</div>
		);
	}

	renderFields()
	{
		const { fields, fieldsPerRow } = this.props;
		const groups = [];
		for (let i = 0, l = fields.length; i < l; i += fieldsPerRow)
		{
			const inputs = fields.slice(i, i + fieldsPerRow);
			groups.push(this.renderRow(inputs, i));
		}
		return groups;
	}

	stateHasKeys()
	{
		return Object.keys(stripEmptyValues(this.state)).length;
	}

	render()
	{
		return (
			<div className="adv-search-container">
				<form onSubmit={this.submit}>
					{this.renderFields()}
					<FormButton disabled={this.props.loading || !this.stateHasKeys()} value="Search" />
				</form>
			</div>
		);
	}
}

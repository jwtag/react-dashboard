import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component
{
	static propTypes = {
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		options: PropTypes.arrayOf(PropTypes.object),
		valueSet: PropTypes.object,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	};

	renderOptions()
	{
		return this.props.options.map((opt, i) =>
		{
			return (
				<option key={i} selected={opt.selected} disabled={opt.disabled} value={opt.value}>{opt.name}</option>
			);
		});
	}

	renderElement()
	{
		const { id, name, valueSet, value, onChange } = this.props;
		const inputValue = value || valueSet[id];
		return (
			<select className="form-control" id={id} name={name} onChange={onChange} value={inputValue}>
				{this.renderOptions()}
			</select>
		);
	}

	render()
	{
		const { id, label, error, warning } = this.props;
		return (
			<div className="form-group">
				<label htmlFor={id}>{label}</label>
				{this.renderElement()}
				{warning ? <div className="warning">{warning}</div> : null}
				{error ? <div className="error">{error}</div> : null}
			</div>
		);
	}
}

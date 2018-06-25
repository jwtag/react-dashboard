import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component
{
	static propTypes = {
		valueSet: PropTypes.object,
		required: PropTypes.bool,
		id: PropTypes.string.isRequired,
		label: PropTypes.string,
		className: PropTypes.string,
		type: PropTypes.string,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		maxLength: PropTypes.string,
		errors: PropTypes.object,
		warnings: PropTypes.object,
		rows: PropTypes.string,
		cols: PropTypes.string
	};

	static defaultProps = {
		valueSet: {},
		errors: {},
		warnings: {}
	};

	renderElement()
	{
		const { id, type, value, valueSet, onChange, onBlur, required, maxLength, rows, cols } = this.props;
		const inputValue = value || valueSet[id];
		if (type === 'textarea')
		{
			return (
				<textarea
					required={required}
					id={id}
					className="form-control"
					name={id}
					value={inputValue}
					onChange={onChange}
					onBlur={onBlur}
					maxLength={maxLength}
					rows={rows}
					cols={cols}
				/>
			);
		} else
		{
			return (
				<input
					required={required}
					id={id}
					className="form-control"
					type={type}
					name={id}
					value={inputValue}
					onChange={onChange}
					onBlur={onBlur}
					maxLength={maxLength}
				/>
			);
		}
	}

	render()
	{
		const { id, label, errors, warnings } = this.props;
		const error = errors[id];
		const warning = warnings[id];
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

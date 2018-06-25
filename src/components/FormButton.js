import React from 'react';
import PropTypes from 'prop-types';

export default class FormButton extends React.Component
{
	static propTypes = {
		disabled: PropTypes.bool.isRequired,
		value: PropTypes.string.isRequired,
		onClick: PropTypes.func,
		className: PropTypes.string
	};

	static defaultProps = {
		disabled: false,
		onClick: () => {},
		className: 'btn btn-primary'
	};

	constructor(props)
	{
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick()
	{
		this.props.onClick();
	}

	render()
	{
		const { value, disabled, className } = this.props;
		const btnClass = disabled ? `disabled ${className}` : className;
		return (
			<button type="submit" value={value} disabled={disabled} className={btnClass} onClick={this.onClick}>
				{value}
			</button>
		);
	}
}

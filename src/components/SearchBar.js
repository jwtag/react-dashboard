import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import FormButton from './FormButton';

export default class SearchBar extends React.Component
{
	static propTypes = {
		search: PropTypes.func.isRequired,
		loading: PropTypes.bool,
		label: PropTypes.string
	};

	static defaultTypes = {
		value: '',
		loading: false
	};

	constructor(props)
	{
		super(props);
		this.state = {
			input: ''
		};
		this.search = this.search.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	search(e)
	{
		e.preventDefault();
		return this.props.search(this.state.input);
	}

	onChange(e)
	{
		this.setState({ input: e.target.value });
	}

	render()
	{
		const { label } = this.props;
		return (
			<form className="search-bar" onSubmit={this.search}>
				<Input
					required
					id="search-bar"
					label={label}
					type="text"
					valueSet={this.state}
					onChange={this.onChange}
				/>
				<FormButton disabled={this.props.loading || !this.state.input} value="Search" />
			</form>
		);
	}
}

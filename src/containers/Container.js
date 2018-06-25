import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import apiActions from '../redux/apiRedux';

const Container = Component => class extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	componentWillMount()
	{
		this.props.resetError();
	}

	render()
	{
		return <Component />;
	}
};

const mapDispatchToProps = dispatch =>
{
	return {
		resetError: () => dispatch(apiActions.error(null))
	};
};

export default compose(connect(null, mapDispatchToProps), Container);

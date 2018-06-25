import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../containers/Container';


export class SampleContainer extends React.Component
{
	static propTypes = {};

	constructor(props)
	{
		super(props);
		this.state = {};
	}

	render()
	{
		return (
			<div>
				<h2>Sample Container</h2>
			</div>
		);
	}
}

const mapStateToProps = state =>
{
	return {};
};

const mapDispatchToProps = (dispatch, ownProps) =>
{
	return {};
};

export const ConnectedSampleContainer = connect(mapStateToProps, mapDispatchToProps)(SampleContainer);
export default Container(ConnectedSampleContainer);

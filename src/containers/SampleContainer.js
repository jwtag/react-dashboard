import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../containers/Container';
import Types from '../redux/sampleRedux';

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
		function triggerSample() { console.log(JSON.stringify(this.props.state))};
		const {property} = this.state;
		return (
			<div>
				<h2>Sample Container</h2>
				<button className="sample" onClick={triggerSample} h2="asfdasdf"/>
			</div>
		);
	}
}

const mapStateToProps = state =>
{
	return {property : () => state.sample.property};
};

const mapDispatchToProps = (dispatch, ownProps) =>
{
	return {triggerSample : () => dispatch(Types.sample("foo"))};
};

export const ConnectedSampleContainer = connect(mapStateToProps, mapDispatchToProps)(SampleContainer);
export default Container(ConnectedSampleContainer);

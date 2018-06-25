import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../containers/Container';


export class MainMenuContainer extends React.Component
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
				<h2>Main Menu Container</h2>
				//IMPLEMENT GRID HERE W/ TICKET # & LINK, # REPORTS, USERID
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

export const ConnectedMainMenuContainer = connect(mapStateToProps, mapDispatchToProps)(MainMenuContainer);
export default Container(ConnectedMainMenuContainer);

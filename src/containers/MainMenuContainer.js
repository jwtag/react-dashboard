import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../containers/Container';
import List from '../components/List';

export class MainMenuContainer extends React.Component
{
	static propTypes = {};
	placeholder_items = ["Bad Item 1", "Bad Item 2", "Bad Item 3"];

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
				<List items={this.placeholder_items} onClickItem={JSON.stringify} ListItem={JSON.stringify}/>
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

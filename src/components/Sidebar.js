import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.jpg';
import login from '../sagas/AccessTokenSagas';
import AccessTokenActions from '../redux/AccessTokenRedux';
import api from '../utilities/api';
import { connect } from 'react-redux';
import { AccessTokenSignIn } from './AccessTokenSignIn';

export class Sidebar extends React.Component
{

	onSignInClick() {
		const {signIn} = this.props;
		const providerToken = window.prompt('Enter your provider token', '');
		signIn(providerToken);
	}

	render()
	{
		return (
			<div className="sidebar">
				<nav className="img-container">
					<AccessTokenSignIn />
				</nav>
				<nav className="sidebar-nav">
					<NavLink to="/main" activeClassName="selected">Ticketed Posts </NavLink>
					<NavLink to="/main" activeClassName="selected">Removed Posts</NavLink>
					<NavLink to="/main" activeClassName="selected">Banned Users</NavLink>
					<NavLink to="/Tickets/SidebarTicket" activeClassName="selected">Test Ticket</NavLink>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = state =>
{
	return {accessToken : () => state.accessToken.property};
};

const mapDispatchToProps = (dispatch, ownProps) =>
{
	return {
		signIn : providerToken => dispatch(AccessTokenActions.createAccessToken(providerToken))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)
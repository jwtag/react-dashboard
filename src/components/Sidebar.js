import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.jpg';
import {LoginSagas} from './SignInButton/LoginSagas';
import Types from './SignInButton/AccessTokenRedux';
import api from '../utilities/api';

export default class Sidebar extends React.Component
{
	render()
	{
		function getTokenDialogue() {
			var token = window.prompt("Enter your FB Token", "");
			if (token !== null){
				console.log("read token : " + token);
				state.token = token;
				mapDispatchToProps;
				console.log("asdf");
			}
		};

		return (
			<div className="sidebar">
				<nav className="img-container">
					<button className="signin" onClick={getTokenDialogue}>
							<img src = {logo} width="auto" height="auto"/>
							
					</button>
				</nav>
				<nav className="sidebar-nav">
					<NavLink to="/main" activeClassName="selected">Ticketed Posts </NavLink>
					<NavLink to="/main" activeClassName="selected">Removed Posts</NavLink>
					<NavLink to="/main" activeClassName="selected">Banned Users</NavLink>
					<NavLink to="/Tickets/SampleTicket" activeClassName="selected">Test Ticket</NavLink>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = state =>
{
	return {property : () => state.accessToken.property};
};

const mapDispatchToProps = (dispatch, ownProps) =>
{
	return {getTokenDialogue : () => dispatch(Types.accessToken)};
};
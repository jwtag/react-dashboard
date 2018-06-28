import React from 'react';
import { NavLink } from 'react-router-dom';
import { AccessTokenButton } from './AccessTokenButton';

export default class Sidebar extends React.Component
{
	render()
	{
		return (
			<div className="sidebar">
				<nav className="img-container">
					<AccessTokenButton />
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

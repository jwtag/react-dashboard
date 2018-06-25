import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.jpg';

export default class Sidebar extends React.Component
{
	render()
	{
		return (
			<div className="sidebar">
				<nav className="img-container">
					<NavLink to="/main" activeClassName="selected">
						<img src = {logo}/>
					</NavLink>
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

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import SampleContainer from '../containers/SampleContainer';
import MainMenuContainer from '../containers/MainMenuContainer';
import { TicketContainer } from '../containers/TicketContainer';

export default class MainLayout extends React.Component
{
	render()
	{
		return (
			<div className="grid-container">
				<Sidebar />
				<div className="page-title">
					<h1>
						GottaSpare Ticket Policing System
					</h1>
				</div>
				<div className="main-content">
					<Switch>
						<Route path="/main" component={MainMenuContainer} />
						<Route path="/Tickets/SampleTicket" component={TicketContainer}/>
					</Switch>
				</div>

			</div>
		);
	}
}

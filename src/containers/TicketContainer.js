import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../containers/Container';
import okay from '../okay.png';
import bad from '../bad.png';
import placeholder_image from '../placeholder_image.jpg';
import { NavLink } from 'react-router-dom';

export class TicketContainer extends React.Component
{
	static propTypes = {};

	placeholder_ticket_number = 123456789;
	placeholder_user = "Gru";
	placeholder_date = "1/1/1970";
	placeholder_description = "banana banana apple banana";
	placeholder_count = 5280;
	placeholder_complaints = {};


	constructor(props)
	{
		super(props);
		this.state = {};
	}

	render()
	{
		return (
			<div>
				<h2>Ticket Number: {this.placeholder_ticket_number}</h2>
				<img src={placeholder_image} height="auto" width="500"/>
				<div class="user">
					<span>Date Posted:</span>
					{this.placeholder_user}
				</div>
				<div class="date-posted">
					<span>Date Posted:</span>
					{this.placeholder_date}
				</div>
				<div class="num-complaints">
					<span>Date Posted:</span>
					{this.placeholder_count}
				</div>
				<div class="desc">
					<span>Date Posted:</span>
					{this.placeholder_description}
				</div>
				<div class="complaints">
					<span>Complaints (by user): </span>
					{/*LIST STUFF*/}
				</div>
				<button class="Okay"><img src={okay} height="50" width="auto"/></button>
				<button class="Bad"><img src={bad} height="50" width="auto"/></button>
				<NavLink to="/Tickets/SampleTicket" activeClassName="selected">Previous</NavLink>
				<NavLink to="/Tickets/SampleTicket" activeClassName="selected">Next</NavLink>
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

export const ConnectedTicketContainer = connect(mapStateToProps, mapDispatchToProps)(TicketContainer);
export default Container(ConnectedTicketContainer);

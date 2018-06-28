import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.jpg';
import login from '../sagas/AccessTokenSagas';
import AccessTokenActions from '../redux/AccessTokenRedux';
import api from '../utilities/api';
import { connect } from 'react-redux';

export class AccessTokenSignIn extends React.Component
{

	onSignInClick() {
		const {signIn} = this.props;
		const providerToken = window.prompt('Enter your provider token', '');
		signIn(providerToken);
	}

	render()
	{
		return (
            <button className="signin" onClick={this.onSignInClick.bind(this)}>
                    <img src = {logo} width="200" height="auto"/>
            </button>
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

export default connect(mapStateToProps,mapDispatchToProps)(AccessTokenSignIn)
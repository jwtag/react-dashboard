import React from 'react';
import logo from '../logo.jpg';
import AccessTokenActions from '../redux/AccessTokenRedux';
import { connect } from 'react-redux';

export class AccessTokenButton extends React.Component
{

	constructor(props) {
		super(props);
		console.log(props);
	}

	onSignInClick() {
		const {signIn} = this.props;
        const providerToken = window.prompt('Enter your provider token', '');
        console.log(signIn);
        {signIn}(providerToken);   
	}

	render()
	{
		return (
            <button className="signin" onClick={this.onSignInClick.bind(this)}>
                    <img src = {logo} width="auto" height="auto"/>
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
        signIn : providerToken => dispatch(AccessTokenActions.createAccessToken(providerToken)),
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(AccessTokenButton);
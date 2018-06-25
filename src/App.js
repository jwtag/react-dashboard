import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from './components/MainLayout';

export class App extends React.Component
{
	render()
	{
		return <MainLayout />;
	}
}

const mapStateToProps = state =>
{
	return {};
};

const mapDispatchToProps = dispatch =>
{
	return {};
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(ConnectedApp);

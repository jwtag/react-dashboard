// Application entrypoint.

// Load up the application styles
import 'react-datetime/css/react-datetime.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/main.sass';

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import sagas from './sagas/';
import App from './App.js';
import reducer from './redux';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'dev') middleware.push(logger);

const store = createStore(reducer, applyMiddleware(...middleware));
sagaMiddleware.run(sagas);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('react-root')
);

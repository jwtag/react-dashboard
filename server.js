'use strict';

const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const endpoints = require('./server/endpoints');
const app = express();

const clientErrorHandler = require('./server/error').clientErrorHandler;

app.use(bodyParser.json());
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(endpoints);

app.get('*', (req, res) =>
{
	res.sendFile(path.join(__dirname, 'index.html'));
});
app.use(clientErrorHandler);

const port = process.env.REACT_DASHBOARD_PORT || 8080;
app.listen(port, () =>
{
	console.info(`Listening on port ${port}`);
});
module.exports = app;

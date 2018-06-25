module.exports.clientErrorHandler = function(err, req, res, next)
{
	if (process.env.NODE_ENV === 'dev' || process.env.LOG_DASHBOARD) console.error(err);

	let message = err.message;
	if(err.cause && err.cause.cause) message += ' ' + err.cause.cause.message;

	res.status(err.status || err.statusCode || 500).send({
		error: {
			status: err.status,
			message: message
		}
	});
};

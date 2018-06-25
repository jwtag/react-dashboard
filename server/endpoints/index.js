const router = require('express').Router();

router.get('/sample', (req, res, next) =>
{	
	return res.status(200).json({sample: 'foo'});		
});

module.exports = router;

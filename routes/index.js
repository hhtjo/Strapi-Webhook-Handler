var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST webhook. */
router.post('/', function(req, res, next) {
	let authHeader = req.get("Authorization");
	let url = req.query.url;

	axios({
		url: url,
		method: "post",
		headers: {
			"Authorization": authHeader,
			"Content-Type": "application/json",
			"User-Agent": "webhook-converter"
		},
		data: JSON.stringify({
			"force_build": true
		})
	}).then(response => {
		res.send(response.data);
	}).catch(err => {
		next(err)
	});

});

module.exports = router;

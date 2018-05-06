const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//BOF MORGAN
const morgan = require('morgan');
const morganBody = require('morgan-body');
morganBody(app);
//EOF MORGAN

// REQUIRE CONTROLLERS HERE
var adresSorguController = require('./controllers/adresSorguController');
// ENDPOINTS
var dummy = function(req, res) {}

app.post('/api/getByFilter', adresSorguController.getByFilter);
// app.get('/api/filter', adresSorguController.getByFilter);

mongoose.Promise = Promise;
mongoose.connection.openUri('mongodb://localhost/tr', function(err, db){
	if(!err){
		console.log('connected to mongodb');
		var server = app.listen(8080, function(){
			console.log('listening adressorguapi ', server.address().port);
		});
	}
});
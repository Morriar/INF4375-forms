var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var populateDB = function() {
	var messages = [
        {
			'title': 'Hello 5chanz!',
			'mail': 'josh@bytheway.com',
			'date': new Date(),
			'anonymous': true,
            'body': "Hello World!"
        },
		{
			'title': 'STUFU noob!',
			'mail': 'lolZeKat@kikoolol.ca',
			'date': new Date(),
			'anonymous': false,
            'body': "Hello anon!"
        }
	];
	db.getConnection(function(err, db) {
        db.collection("messages", function(err, collection) {
            collection.find().toArray(function(err, messages_coll) {
                if(messages_coll.length == 0) {
                    collection.insert(messages, {safe:true}, function(err, result) {});
                }
            });
        });
    });
}

populateDB();

module.exports = router;

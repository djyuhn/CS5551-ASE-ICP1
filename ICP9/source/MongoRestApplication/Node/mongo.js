/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://root:admin@ds111535.mlab.com:11535/icp9';
//var url = 'mongodb://marmik:2621@ds051923.mlab.com:51923/demo';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        var db = db.db('icp9');
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findPhoneNumber(db, function() {
        db.close();
    });
});
app.post('/search', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        var db = db.db('icp9');
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        findPhoneNumber(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

var insertDocument = function(db, data, callback) {
    db.collection('users').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the users collection.");
        callback();
    });
};

var findPhoneNumber = function(db, callback) {
    var db = db.db('icp9');
    var cursor = db.collection('users').find({"phone" : callback.phoneSearch});
    cursor.each(function(err,doc){
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("Phone Searched " + doc.phone);
        }
    });
};

var server = app.listen(8081,function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
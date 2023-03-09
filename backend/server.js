const express = require('express');

const app = express();

const http = require('http').createServer(app);

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var ObjectId = mongodb.ObjectID;


http.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on port ' + (process.env.PORT || 3000));

    // Connect to the db
    MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {

        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            return;
        } 

        //HURRAY!! We are connected. :)
        db = client.db("chatapp");
        globalAgent.db = db;
        console.log('Connection established to', db);
    })
});
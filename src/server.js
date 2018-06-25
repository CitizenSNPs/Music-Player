var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/songs');

var Song = require('./model/song');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/songs', function(request, response) {
    var song = new Song();
    song.title = request.body.title;
    song.save(function(err, savedSong) {
       if (err) {
           response.status(500).send({error:"Could not save song..."});
       } else {
           response.send(savedSong);
       }
    });
});

app.get('/songs', function(request, response) {

    Song.find({},function(err, songs) {
        if (err) {
            response.status(500).send({error: "Could not fetch song list"});
        } else {
            response.send(songs);
        }
    });
});


app.listen(3004, function() {
    console.log("API is running on port 3004...");

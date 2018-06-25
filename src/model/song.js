var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var song = new Schema({
    title: String,
    artist: String,
    src: String,
    img: String,
});

module.exports = mongoose.model('Song', song);

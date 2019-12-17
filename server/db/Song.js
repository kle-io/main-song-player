/* eslint-disable no-console */
const mongoose = require('mongoose');
const db = require('./index.js');

const songSchema = new mongoose.Schema({
  artist: String,
  genre: String,
  title: String,
  photo: String,
  color1: String,
  color2: String,
  duration: Number,
  link: String,
  posted: String,
  peaks: [Number],
  comments: [{
    user: String,
    photo: String,
    comment: String,
    time: Number,
  }],
});

const Song = mongoose.model('Song', songSchema);

const getSong = (songNum, callback) => {
  Song.findOne({ link : `https://kleiomainplayer.s3.us-west-1.amazonaws.com/songs/${songNum}.mp3` }, (err, data) => {
    if (err) {
      console.log('error finding data');
    } else {
      return data;
    }
  })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      console.log('error from DB');
      callback(err, null);
    });
};

module.exports = Song;
module.exports.getSong = getSong;

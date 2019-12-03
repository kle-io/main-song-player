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
  duration: String,
  link: String,
  posted: String,
  comments: [{
    user: String,
    photo: String,
    comment: String,
    time: String,
  }],
});

const Song = mongoose.model('Song', songSchema);

const getAllSongs = (callback) => {
  Song.find((err, data) => {
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
module.exports.getAllSongs = getAllSongs;

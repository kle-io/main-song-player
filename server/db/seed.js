const db = require('./index.js');
const Song = require('./Song.js');
const s3 = require('./s3.js');
const faker = require('faker');

const songs = s3.urlSongs;
const covers = s3.urlCovers;

var randomIndex = Math.floor((Math.random() * 100) + 1);

var genres = ['Alternative Rock', 'Ambient', 'Classical', 'Country', 'Dance & EDM', 'Deep House', 'Drum & Bass', 'Dubstep', 'Electronic', 'Folk & Singer-Songwriter', 'Hip-hop & Rap', 'House', 'Indie', 'Jazz & Blues', 'Metal', 'Piano', 'Pop', 'R&B & Soul', 'Reggae', 'Rock', 'Trance', 'Trap']
var genreIndex = Math.floor((Math.random() * 22) + 1);

var sampleSongs = [];

for (let i = 1; i <= 100; i++) {
  var artist = faker.internet.userName();
  var genre = genres[genreIndex];
  var title = faker.random.words();
  var color1 = faker.internet.color();
  var color2 = faker.internet.color();
  var postTime = faker.date.between('2019-01-01', '2019-11-31');

  // random comment generator
  var comments = [];
  var commentIndex = Math.floor((Math.random() * 60) + 1);
  for (let i = 0; i < commentIndex; i++) {
    var comment = {
      user: faker.internet.userName(),
      photo: songs[randomIndex],
      comment: faker.lorem.sentence(),
    }
    comments.push(comment);
  }

  // create each sample song
  sampleSongs.push({
    artist: artist,
    genre: genre,
    title: title,
    photo: covers[i],
    color1: color1,
    color2: color2,
    link: songs[i],
    posted: postTime,
    comments: comments
  })
}

const insertSampleSongs = function() {
  Song.create(sampleSongs)
    .then(() => db.disconnect());
}

insertSampleSongs();